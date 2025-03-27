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

export interface IProduct {
  id: string
  name: string
  description: string
  buy_price: number
  retail_price: number
  stock: number
  category: string
  created_at: string
  store_id: string
}

export interface IFormattedProduct {
  id: string
  name: string
  description: string
  buy_price: string
  retail_price: string
  stock: number
  category: string
  created_at: string
  store_id: string
}
