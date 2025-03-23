export interface IOrder {
  id: string
  product_id: string
  customer_email: string
  quantity: number
  total_price: number
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
  store_id: string
}
