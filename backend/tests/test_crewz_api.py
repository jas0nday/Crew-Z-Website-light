"""
CrewZ E-commerce API Tests
Tests for: Products, Newsletter, Contact, Orders, Order Tracking
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndProducts:
    """Test basic API health and products endpoint"""
    
    def test_products_endpoint(self):
        """GET /api/products - should return list of 3 products"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Products should be a list"
        assert len(data) == 3, f"Expected 3 products, got {len(data)}"
        
        # Verify product structure
        slugs = [p['slug'] for p in data]
        assert 'speed' in slugs, "Missing 'speed' product"
        assert 'cox' in slugs, "Missing 'cox' product"
        assert 'coach' in slugs, "Missing 'coach' product"
        
        # Verify pricing
        for product in data:
            assert 'price_usd' in product, f"Product {product['slug']} missing price_usd"
            assert 'name' in product, f"Product {product['slug']} missing name"
        
        # Check specific prices
        speed = next(p for p in data if p['slug'] == 'speed')
        assert speed['price_usd'] == 200, f"Speed price should be 200, got {speed['price_usd']}"
        
        cox = next(p for p in data if p['slug'] == 'cox')
        assert cox['price_usd'] == 250, f"Cox price should be 250, got {cox['price_usd']}"
        
        coach = next(p for p in data if p['slug'] == 'coach')
        assert coach['price_usd'] == 300, f"Coach price should be 300, got {coach['price_usd']}"
        print("✓ Products endpoint returns correct data with proper pricing")


class TestNewsletter:
    """Test newsletter subscription endpoint"""
    
    def test_newsletter_subscribe_success(self):
        """POST /api/newsletter - should subscribe new email"""
        test_email = f"TEST_newsletter_{uuid.uuid4().hex[:8]}@example.com"
        
        response = requests.post(
            f"{BASE_URL}/api/newsletter",
            json={"email": test_email},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "message" in data, "Response should contain message"
        assert "subscribed" in data["message"].lower() or "success" in data["message"].lower(), \
            f"Unexpected message: {data['message']}"
        print(f"✓ Newsletter subscription works for {test_email}")
    
    def test_newsletter_duplicate_email(self):
        """POST /api/newsletter - should handle duplicate gracefully"""
        test_email = f"TEST_dup_{uuid.uuid4().hex[:8]}@example.com"
        
        # First subscription
        response1 = requests.post(
            f"{BASE_URL}/api/newsletter",
            json={"email": test_email},
            headers={"Content-Type": "application/json"}
        )
        assert response1.status_code == 200
        
        # Second subscription (duplicate)
        response2 = requests.post(
            f"{BASE_URL}/api/newsletter",
            json={"email": test_email},
            headers={"Content-Type": "application/json"}
        )
        assert response2.status_code == 200, "Duplicate should not cause error"
        
        data = response2.json()
        assert "already" in data["message"].lower(), f"Should indicate already subscribed: {data['message']}"
        print("✓ Duplicate newsletter subscription handled correctly")


class TestContact:
    """Test contact form submission endpoint"""
    
    def test_contact_submit_success(self):
        """POST /api/contact - should submit contact message"""
        test_data = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "email": f"TEST_contact_{uuid.uuid4().hex[:8]}@example.com",
            "subject": "Test Subject",
            "message": "This is a test message from automated testing."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "message" in data, "Response should contain message"
        assert "success" in data["message"].lower() or "sent" in data["message"].lower(), \
            f"Unexpected message: {data['message']}"
        print("✓ Contact form submission works")
    
    def test_contact_missing_fields(self):
        """POST /api/contact - should validate required fields"""
        # Missing message field
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test"
            # missing message
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        # Should return 422 for validation error
        assert response.status_code == 422, f"Expected 422 for missing field, got {response.status_code}"
        print("✓ Contact form validates required fields")


class TestOrders:
    """Test order creation and tracking endpoints"""
    
    def test_create_order_success(self):
        """POST /api/orders - should create order and return order number"""
        order_data = {
            "customer_name": f"TEST_Customer_{uuid.uuid4().hex[:6]}",
            "customer_email": f"TEST_order_{uuid.uuid4().hex[:8]}@example.com",
            "shipping_address": {
                "street": "123 Test Street",
                "city": "Test City",
                "state": "TS",
                "postal_code": "12345",
                "country": "USA"
            },
            "items": [
                {"product_slug": "speed", "quantity": 1}
            ],
            "currency": "USD"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=order_data,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "order_number" in data, "Response should contain order_number"
        assert "order_id" in data, "Response should contain order_id"
        assert "total_usd" in data, "Response should contain total_usd"
        assert "status" in data, "Response should contain status"
        
        # Verify order number format (CZ-YYMMDD-XXXXXX)
        assert data["order_number"].startswith("CZ-"), f"Order number should start with CZ-: {data['order_number']}"
        
        # Verify total calculation
        assert data["total_usd"] == 200, f"Total should be 200 for 1 Speed, got {data['total_usd']}"
        assert data["status"] == "received", f"Initial status should be 'received', got {data['status']}"
        
        print(f"✓ Order created successfully: {data['order_number']}")
        return data["order_number"]
    
    def test_create_order_multiple_items(self):
        """POST /api/orders - should handle multiple items with correct total"""
        order_data = {
            "customer_name": f"TEST_Multi_{uuid.uuid4().hex[:6]}",
            "customer_email": f"TEST_multi_{uuid.uuid4().hex[:8]}@example.com",
            "shipping_address": {
                "street": "456 Multi Street",
                "city": "Multi City",
                "state": "MC",
                "postal_code": "67890",
                "country": "UK"
            },
            "items": [
                {"product_slug": "speed", "quantity": 2},  # 2 x $200 = $400
                {"product_slug": "cox", "quantity": 1}     # 1 x $250 = $250
            ],
            "currency": "GBP"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=order_data,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data["total_usd"] == 650, f"Total should be 650 (2x200 + 1x250), got {data['total_usd']}"
        assert data["currency"] == "GBP", f"Currency should be GBP, got {data['currency']}"
        
        # GBP conversion: 650 * 0.79 = 513.5, rounded to 514
        expected_display = round(650 * 0.79, 2)
        assert data["total_display"] == expected_display, f"Display total should be {expected_display}, got {data['total_display']}"
        
        print(f"✓ Multi-item order with currency conversion works: {data['order_number']}")
    
    def test_create_order_invalid_product(self):
        """POST /api/orders - should reject invalid product slug"""
        order_data = {
            "customer_name": "Test User",
            "customer_email": "test@example.com",
            "shipping_address": {
                "street": "123 Test St",
                "city": "Test City",
                "state": "TS",
                "postal_code": "12345",
                "country": "USA"
            },
            "items": [
                {"product_slug": "invalid_product", "quantity": 1}
            ],
            "currency": "USD"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=order_data,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400, f"Expected 400 for invalid product, got {response.status_code}"
        print("✓ Invalid product slug rejected correctly")
    
    def test_track_order_success(self):
        """GET /api/orders/track/{order_number} - should return order details"""
        # First create an order
        order_data = {
            "customer_name": f"TEST_Track_{uuid.uuid4().hex[:6]}",
            "customer_email": f"TEST_track_{uuid.uuid4().hex[:8]}@example.com",
            "shipping_address": {
                "street": "789 Track Street",
                "city": "Track City",
                "state": "TC",
                "postal_code": "11111",
                "country": "USA"
            },
            "items": [
                {"product_slug": "coach", "quantity": 1}
            ],
            "currency": "USD"
        }
        
        create_response = requests.post(
            f"{BASE_URL}/api/orders",
            json=order_data,
            headers={"Content-Type": "application/json"}
        )
        assert create_response.status_code == 200
        order_number = create_response.json()["order_number"]
        
        # Now track the order
        track_response = requests.get(f"{BASE_URL}/api/orders/track/{order_number}")
        assert track_response.status_code == 200, f"Expected 200, got {track_response.status_code}"
        
        data = track_response.json()
        assert data["order_number"] == order_number, "Order number should match"
        assert data["status"] == "received", "Status should be 'received'"
        assert "items" in data, "Should contain items"
        assert "total_display" in data, "Should contain total_display"
        assert "created_at" in data, "Should contain created_at"
        
        # Verify items
        assert len(data["items"]) == 1, "Should have 1 item"
        assert data["items"][0]["product_name"] == "CrewZ Coach", f"Product name mismatch: {data['items'][0]}"
        
        print(f"✓ Order tracking works for {order_number}")
    
    def test_track_order_not_found(self):
        """GET /api/orders/track/{order_number} - should return 404 for invalid order"""
        response = requests.get(f"{BASE_URL}/api/orders/track/INVALID-ORDER-123")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print("✓ Invalid order number returns 404")


class TestAuth:
    """Test authentication endpoints (unauthenticated access)"""
    
    def test_auth_me_unauthenticated(self):
        """GET /api/auth/me - should return 401 when not authenticated"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✓ Auth endpoint returns 401 for unauthenticated requests")
    
    def test_admin_orders_unauthenticated(self):
        """GET /api/admin/orders - should return 401 when not authenticated"""
        response = requests.get(f"{BASE_URL}/api/admin/orders")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✓ Admin orders endpoint protected")
    
    def test_admin_stats_unauthenticated(self):
        """GET /api/admin/stats - should return 401 when not authenticated"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✓ Admin stats endpoint protected")


class TestCurrencyConversion:
    """Test currency conversion in orders"""
    
    def test_aud_currency_conversion(self):
        """POST /api/orders - should convert to AUD correctly"""
        order_data = {
            "customer_name": f"TEST_AUD_{uuid.uuid4().hex[:6]}",
            "customer_email": f"TEST_aud_{uuid.uuid4().hex[:8]}@example.com",
            "shipping_address": {
                "street": "1 AUD Street",
                "city": "Sydney",
                "state": "NSW",
                "postal_code": "2000",
                "country": "Australia"
            },
            "items": [
                {"product_slug": "speed", "quantity": 1}  # $200 USD
            ],
            "currency": "AUD"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/orders",
            json=order_data,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        
        data = response.json()
        assert data["currency"] == "AUD"
        # AUD conversion: 200 * 1.54 = 308
        expected_display = round(200 * 1.54, 2)
        assert data["total_display"] == expected_display, f"AUD display should be {expected_display}, got {data['total_display']}"
        print(f"✓ AUD currency conversion works: ${data['total_display']} AUD")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
