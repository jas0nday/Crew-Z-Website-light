from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

PRODUCT_PRICES = {
    "speed": {"name": "CrewZ Speed", "price_usd": 200},
    "cox": {"name": "CrewZ Cox", "price_usd": 250},
    "coach": {"name": "CrewZ Coach", "price_usd": 300},
}
CURRENCY_RATES = {"USD": 1.0, "GBP": 0.79, "AUD": 1.54}
ADMIN_EMAILS = [e.strip() for e in os.environ.get('ADMIN_EMAILS', '').split(',') if e.strip()]


class ShippingAddress(BaseModel):
    street: str
    city: str
    state: str = ""
    postal_code: str
    country: str

class OrderItemInput(BaseModel):
    product_slug: str
    quantity: int

class CreateOrderInput(BaseModel):
    customer_name: str
    customer_email: str
    shipping_address: ShippingAddress
    items: List[OrderItemInput]
    currency: str = "USD"
    notes: str = ""

class NewsletterInput(BaseModel):
    email: str

class ContactInput(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class UpdateOrderStatusInput(BaseModel):
    status: str

class UpdateTrackingInput(BaseModel):
    tracking_number: str


async def get_current_user(request: Request):
    session_token = request.cookies.get("session_token")
    if not session_token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            session_token = auth_header[7:]
    if not session_token:
        return None
    session = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session:
        return None
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        return None
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    return user


async def require_admin(request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if ADMIN_EMAILS and user.get("email") not in ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Not authorized")
    return user


@api_router.get("/auth/session")
async def auth_session(session_id: str, response: Response):
    async with httpx.AsyncClient() as http_client:
        resp = await http_client.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id}
        )
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session")
    data = resp.json()
    email, name = data["email"], data["name"]
    picture = data.get("picture", "")
    session_token = data["session_token"]

    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one({"email": email}, {"$set": {"name": name, "picture": picture}})
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id, "email": email, "name": name,
            "picture": picture, "created_at": datetime.now(timezone.utc).isoformat()
        })

    await db.user_sessions.insert_one({
        "user_id": user_id, "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    })

    response.set_cookie(
        key="session_token", value=session_token,
        httponly=True, secure=True, samesite="none", path="/", max_age=7 * 24 * 60 * 60
    )
    return {"user_id": user_id, "email": email, "name": name, "picture": picture}


@api_router.get("/auth/me")
async def auth_me(request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    response.delete_cookie("session_token", path="/")
    return {"message": "Logged out"}


@api_router.get("/products")
async def list_products():
    return [{"slug": s, **p} for s, p in PRODUCT_PRICES.items()]


@api_router.post("/newsletter")
async def subscribe_newsletter(inp: NewsletterInput):
    existing = await db.newsletter.find_one({"email": inp.email})
    if existing:
        return {"message": "Already subscribed"}
    await db.newsletter.insert_one({"email": inp.email, "created_at": datetime.now(timezone.utc).isoformat()})
    return {"message": "Subscribed successfully"}


@api_router.post("/contact")
async def submit_contact(inp: ContactInput):
    await db.contact_messages.insert_one({
        "id": str(uuid.uuid4()), "name": inp.name, "email": inp.email,
        "subject": inp.subject, "message": inp.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    return {"message": "Message sent successfully"}


@api_router.post("/orders")
async def create_order(inp: CreateOrderInput):
    order_items = []
    total_usd = 0
    for item in inp.items:
        if item.product_slug not in PRODUCT_PRICES:
            raise HTTPException(status_code=400, detail=f"Invalid product: {item.product_slug}")
        product = PRODUCT_PRICES[item.product_slug]
        item_total = product["price_usd"] * item.quantity
        total_usd += item_total
        order_items.append({
            "product_slug": item.product_slug, "product_name": product["name"],
            "quantity": item.quantity, "unit_price_usd": product["price_usd"],
            "total_usd": item_total
        })

    currency = inp.currency if inp.currency in CURRENCY_RATES else "USD"
    rate = CURRENCY_RATES[currency]
    total_display = round(total_usd * rate, 2)

    order_number = f"CZ-{datetime.now(timezone.utc).strftime('%y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    order_id = str(uuid.uuid4())

    order = {
        "order_id": order_id, "order_number": order_number,
        "customer_name": inp.customer_name, "customer_email": inp.customer_email,
        "shipping_address": inp.shipping_address.model_dump(),
        "items": order_items, "total_usd": total_usd,
        "currency": currency, "total_display": total_display,
        "status": "received", "tracking_number": "", "notes": inp.notes,
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    await db.orders.insert_one(order)
    await send_fulfilment_email(order)

    return {
        "order_id": order_id, "order_number": order_number,
        "total_usd": total_usd, "total_display": total_display,
        "currency": currency, "status": "received"
    }


@api_router.get("/orders/track/{order_number}")
async def track_order(order_number: str):
    order = await db.orders.find_one({"order_number": order_number}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return {
        "order_number": order["order_number"], "status": order["status"],
        "tracking_number": order.get("tracking_number", ""),
        "items": order["items"], "total_display": order["total_display"],
        "currency": order["currency"], "created_at": order["created_at"]
    }


@api_router.get("/admin/orders")
async def admin_list_orders(request: Request):
    await require_admin(request)
    return await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.put("/admin/orders/{order_id}/status")
async def admin_update_status(order_id: str, inp: UpdateOrderStatusInput, request: Request):
    await require_admin(request)
    result = await db.orders.update_one({"order_id": order_id}, {"$set": {"status": inp.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Status updated"}


@api_router.put("/admin/orders/{order_id}/tracking")
async def admin_update_tracking(order_id: str, inp: UpdateTrackingInput, request: Request):
    await require_admin(request)
    result = await db.orders.update_one({"order_id": order_id}, {"$set": {"tracking_number": inp.tracking_number}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Tracking updated"}


@api_router.get("/admin/stats")
async def admin_stats(request: Request):
    await require_admin(request)
    total_orders = await db.orders.count_documents({})
    orders_cursor = await db.orders.find({}, {"_id": 0, "total_usd": 1, "status": 1}).to_list(10000)
    total_revenue = sum(o.get("total_usd", 0) for o in orders_cursor)
    status_counts = {}
    for o in orders_cursor:
        s = o.get("status", "unknown")
        status_counts[s] = status_counts.get(s, 0) + 1
    subscribers = await db.newsletter.count_documents({})
    messages = await db.contact_messages.count_documents({})
    return {
        "total_orders": total_orders, "total_revenue_usd": total_revenue,
        "newsletter_subscribers": subscribers, "contact_messages": messages,
        "status_counts": status_counts
    }


@api_router.get("/admin/messages")
async def admin_list_messages(request: Request):
    await require_admin(request)
    return await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.get("/admin/subscribers")
async def admin_list_subscribers(request: Request):
    await require_admin(request)
    return await db.newsletter.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


async def send_fulfilment_email(order):
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = os.environ.get("SMTP_PASS")
    fulfilment_email = os.environ.get("FULFILMENT_EMAIL")

    if not all([smtp_host, smtp_user, smtp_pass, fulfilment_email]):
        logger.warning("SMTP not configured - skipping fulfilment email for order %s", order["order_number"])
        return

    items_text = "\n".join([f"  - {i['product_name']} x{i['quantity']} (${i['total_usd']})" for i in order["items"]])
    addr = order["shipping_address"]
    address_text = f"{addr['street']}, {addr['city']}, {addr.get('state', '')}, {addr['postal_code']}, {addr['country']}"

    body = f"""New Order: {order['order_number']}
Customer: {order['customer_name']}
Email: {order['customer_email']}
Shipping Address: {address_text}

Items:
{items_text}

Total: ${order['total_usd']} USD
Notes: {order.get('notes', 'None')}"""

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = fulfilment_email
    msg["Subject"] = f"New CrewZ Order: {order['order_number']}"
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        logger.info("Fulfilment email sent for order %s", order["order_number"])
    except Exception as e:
        logger.error("Failed to send fulfilment email: %s", str(e))


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
