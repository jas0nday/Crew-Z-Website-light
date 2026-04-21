import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Package, Users, Mail, DollarSign, LogOut, RefreshCw, Send } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STATUS_OPTIONS = ['received', 'confirmed', 'in_production', 'shipped', 'delivered'];
const STATUS_COLORS = {
  received: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_production: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  shipped: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
};

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl" data-testid={`stat-${label.toLowerCase()}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-[#007AFF]" />
        <span className="font-body text-xs text-[#6B7280] uppercase tracking-wider">{label}</span>
      </div>
      <p className="font-heading text-2xl text-[#1A1A2E]">{value}</p>
    </div>
  );
}

function OrdersTable({ orders, onUpdateStatus, onUpdateTracking, trackingEdits, setTrackingEdits }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
      <Table data-testid="orders-table">
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Order</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Customer</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Items</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Total</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Status</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Tracking</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow><TableCell colSpan={7} className="text-center text-[#9CA3AF] font-body py-8">No orders yet</TableCell></TableRow>
          ) : orders.map(order => (
            <TableRow key={order.order_id} className="border-gray-100" data-testid={`order-row-${order.order_number}`}>
              <TableCell className="font-body text-xs text-[#1A1A2E]">{order.order_number}</TableCell>
              <TableCell>
                <p className="font-body text-xs text-[#1A1A2E]">{order.customer_name}</p>
                <p className="font-body text-[10px] text-[#9CA3AF]">{order.customer_email}</p>
              </TableCell>
              <TableCell className="font-body text-xs text-[#6B7280]">
                {order.items?.map(item => `${item.product_name} x${item.quantity}`).join(', ')}
              </TableCell>
              <TableCell className="font-body text-xs text-[#1A1A2E]">${order.total_usd}</TableCell>
              <TableCell>
                <Select value={order.status} onValueChange={(v) => onUpdateStatus(order.order_id, v)}>
                  <SelectTrigger className="w-36 h-8 bg-transparent border-gray-200 text-xs" data-testid={`status-select-${order.order_number}`}>
                    <Badge className={`${STATUS_COLORS[order.status] || 'bg-gray-500/20 text-gray-500'} text-[10px] border rounded-xl px-2 py-0`}>
                      {order.status?.replace('_', ' ')}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {STATUS_OPTIONS.map(s => (
                      <SelectItem key={s} value={s} className="text-[#1A1A2E] text-xs">{s.replace('_', ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Input
                    placeholder="Add tracking"
                    value={trackingEdits[order.order_id] ?? order.tracking_number ?? ''}
                    onChange={(e) => setTrackingEdits(prev => ({ ...prev, [order.order_id]: e.target.value }))}
                    className="h-8 w-32 bg-transparent border-gray-200 text-xs text-[#1A1A2E]"
                    data-testid={`tracking-input-${order.order_number}`}
                  />
                  {trackingEdits[order.order_id] !== undefined && (
                    <button onClick={() => onUpdateTracking(order.order_id)} className="text-[#007AFF] hover:text-[#3395FF]"
                      data-testid={`tracking-save-${order.order_number}`}>
                      <Send className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-body text-[10px] text-[#9CA3AF]">
                {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MessagesTable({ messages }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
      <Table data-testid="messages-table">
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">From</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Subject</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Message</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow><TableCell colSpan={4} className="text-center text-[#9CA3AF] font-body py-8">No messages yet</TableCell></TableRow>
          ) : messages.map((msg) => (
            <TableRow key={msg.id || msg.email} className="border-gray-100">
              <TableCell>
                <p className="font-body text-xs text-[#1A1A2E]">{msg.name}</p>
                <p className="font-body text-[10px] text-[#9CA3AF]">{msg.email}</p>
              </TableCell>
              <TableCell className="font-body text-xs text-[#1A1A2E]">{msg.subject}</TableCell>
              <TableCell className="font-body text-xs text-[#6B7280] max-w-xs truncate">{msg.message}</TableCell>
              <TableCell className="font-body text-[10px] text-[#9CA3AF]">
                {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SubscribersTable({ subscribers }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
      <Table data-testid="subscribers-table">
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Email</TableHead>
            <TableHead className="text-[#007AFF] font-heading uppercase text-xs tracking-wider">Subscribed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.length === 0 ? (
            <TableRow><TableCell colSpan={2} className="text-center text-[#9CA3AF] font-body py-8">No subscribers yet</TableCell></TableRow>
          ) : subscribers.map((sub) => (
            <TableRow key={sub.email} className="border-gray-100">
              <TableCell className="font-body text-xs text-[#1A1A2E]">{sub.email}</TableCell>
              <TableCell className="font-body text-[10px] text-[#9CA3AF]">
                {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, loading, login, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [trackingEdits, setTrackingEdits] = useState({});

  const fetchAll = useCallback(async () => {
    const opts = { credentials: 'include' };
    try {
      const [s, o, m, sub] = await Promise.all([
        fetch(`${API}/admin/stats`, opts), fetch(`${API}/admin/orders`, opts),
        fetch(`${API}/admin/messages`, opts), fetch(`${API}/admin/subscribers`, opts),
      ]);
      if (s.ok) setStats(await s.json());
      if (o.ok) setOrders(await o.json());
      if (m.ok) setMessages(await m.json());
      if (sub.ok) setSubscribers(await sub.json());
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  }, []);

  useEffect(() => {
    if (user) fetchAll();
  }, [user, fetchAll]);

  const updateStatus = async (orderId, status) => {
    await fetch(`${API}/admin/orders/${orderId}/status`, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchAll();
  };

  const updateTracking = async (orderId) => {
    const tracking = trackingEdits[orderId];
    if (!tracking) return;
    await fetch(`${API}/admin/orders/${orderId}/tracking`, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracking_number: tracking })
    });
    setTrackingEdits(prev => ({ ...prev, [orderId]: undefined }));
    fetchAll();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center pt-16" data-testid="admin-login-page">
        <div className="text-center">
          <h1 className="font-heading text-4xl md:text-5xl text-[#1A1A2E] uppercase mb-4">Admin Dashboard</h1>
          <p className="font-body text-[#6B7280] mb-8">Sign in with Google to manage orders and view analytics.</p>
          <button onClick={login}
            className="bg-[#007AFF] text-white font-heading uppercase tracking-widest text-sm py-4 px-8 rounded-full hover:bg-[#3395FF] hover:shadow-lg hover:shadow-blue-100 transition-all"
            data-testid="admin-login-btn">
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-24 pb-16 px-6 md:px-12" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="font-heading text-3xl md:text-4xl text-[#1A1A2E] uppercase">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="font-body text-sm text-[#6B7280]">{user.email}</span>
            <button onClick={fetchAll} className="text-[#007AFF] hover:text-[#3395FF] transition-colors" data-testid="refresh-btn">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={logout} className="text-gray-500 hover:text-[#007AFF] transition-colors" data-testid="admin-logout-btn">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Package} label="Orders" value={stats.total_orders} />
            <StatCard icon={DollarSign} label="Revenue" value={`$${stats.total_revenue_usd}`} />
            <StatCard icon={Users} label="Subscribers" value={stats.newsletter_subscribers} />
            <StatCard icon={Mail} label="Messages" value={stats.contact_messages} />
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="orders">
          <TabsList className="bg-white border border-gray-200 mb-6">
            <TabsTrigger value="orders" className="font-heading uppercase text-xs tracking-wider" data-testid="tab-orders">
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="font-heading uppercase text-xs tracking-wider" data-testid="tab-messages">
              Messages ({messages.length})
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="font-heading uppercase text-xs tracking-wider" data-testid="tab-subscribers">
              Subscribers ({subscribers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTable orders={orders} onUpdateStatus={updateStatus} onUpdateTracking={updateTracking} trackingEdits={trackingEdits} setTrackingEdits={setTrackingEdits} />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTable messages={messages} />
          </TabsContent>

          <TabsContent value="subscribers">
            <SubscribersTable subscribers={subscribers} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
