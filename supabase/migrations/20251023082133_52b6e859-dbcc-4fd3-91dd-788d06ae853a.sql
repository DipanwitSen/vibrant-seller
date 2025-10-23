-- Create customer feedback table
CREATE TABLE IF NOT EXISTS public.customer_feedback (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL,
  seller_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customer_feedback ENABLE ROW LEVEL SECURITY;

-- Customers can create feedback for their orders
CREATE POLICY "Customers can create feedback" 
ON public.customer_feedback 
FOR INSERT 
WITH CHECK (auth.uid() = customer_id);

-- Customers can view their own feedback
CREATE POLICY "Customers can view own feedback" 
ON public.customer_feedback 
FOR SELECT 
USING (auth.uid() = customer_id);

-- Sellers can view feedback for their orders
CREATE POLICY "Sellers can view feedback for their orders" 
ON public.customer_feedback 
FOR SELECT 
USING (auth.uid() = seller_id);

-- Customers can update their own feedback
CREATE POLICY "Customers can update own feedback" 
ON public.customer_feedback 
FOR UPDATE 
USING (auth.uid() = customer_id);

-- Add updated_at trigger
CREATE TRIGGER update_customer_feedback_updated_at
BEFORE UPDATE ON public.customer_feedback
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for feedback
ALTER PUBLICATION supabase_realtime ADD TABLE public.customer_feedback;