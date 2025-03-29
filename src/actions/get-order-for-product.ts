import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { IOrder } from '@/lib/types/db-types'

interface IGetOrders {
  data: IOrder[] | null
  error: string
  ok: boolean
}

export default async function getOrdersForProduct(productId: string): Promise<IGetOrders> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const { data: ordersByProduct, error: ordersError } = await supabase
      .from('dynamic_orders')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (ordersError) {
      throw new Error('Erro ao pegar as vendas do produto')
    }

    return { data: ordersByProduct, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
