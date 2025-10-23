import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total_amount: number;
  status: string;
  customer_id: string;
  seller_id: string;
  shipping_address: string;
  order_items: OrderItem[];
  profiles?: {
    full_name: string;
    phone: string;
  };
}

interface Feedback {
  order_id: string;
  rating: number;
  comment: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, { rating: number; comment: string }>>({});
  const [existingFeedback, setExistingFeedback] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    fetchExistingFeedback();
  }, []);

  const fetchExistingFeedback = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("customer_feedback")
      .select("order_id")
      .eq("customer_id", user.id);

    if (!error && data) {
      const feedbackExists: Record<string, boolean> = {};
      data.forEach(f => {
        feedbackExists[f.order_id] = true;
      });
      setExistingFeedback(feedbackExists);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*),
          profiles!orders_customer_id_fkey (full_name, phone)
        `)
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (orderId: string, rating: number) => {
    setFeedbackMap(prev => ({
      ...prev,
      [orderId]: { ...prev[orderId], rating }
    }));
  };

  const handleCommentChange = (orderId: string, comment: string) => {
    setFeedbackMap(prev => ({
      ...prev,
      [orderId]: { ...prev[orderId], comment }
    }));
  };

  const submitFeedback = async (orderId: string, sellerId: string) => {
    const feedback = feedbackMap[orderId];
    if (!feedback || !feedback.rating) {
      toast({
        title: "Please provide a rating",
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { error } = await supabase
        .from("customer_feedback")
        .insert({
          order_id: orderId,
          customer_id: user.id,
          seller_id: sellerId,
          rating: feedback.rating,
          comment: feedback.comment || "",
        });

      if (error) throw error;

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });

      setExistingFeedback(prev => ({ ...prev, [orderId]: true }));
      setFeedbackMap(prev => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.order_number}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Details</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.profiles?.full_name || "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.profiles?.phone || "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.shipping_address}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Items</h3>
                  <ul className="space-y-1 text-sm">
                    {order.order_items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>Quantity: {item.quantity}</span>
                        <span>₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount</span>
                  <span>₹{order.total_amount}</span>
                </div>

                {order.status === "delivered" && !existingFeedback[order.id] && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h3 className="font-semibold">Leave Feedback</h3>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRatingChange(order.id, star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                (feedbackMap[order.id]?.rating || 0) >= star
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Share your experience (optional)"
                        value={feedbackMap[order.id]?.comment || ""}
                        onChange={(e) => handleCommentChange(order.id, e.target.value)}
                      />
                      <Button onClick={() => submitFeedback(order.id, order.seller_id)}>
                        Submit Feedback
                      </Button>
                    </div>
                  </>
                )}

                {existingFeedback[order.id] && (
                  <p className="text-sm text-muted-foreground">
                    Thank you for your feedback!
                  </p>
                )}
              </CardContent>
            </Card>
          ))}

          {orders.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No orders found
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;