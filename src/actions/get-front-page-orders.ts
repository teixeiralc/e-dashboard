import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'

export interface IFrontPageOrders {
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  total_price: number
  created_at: string
}

interface IGetOrders {
  data: IFrontPageOrders[] | null
  error: string
  ok: boolean
}

export default async function getFrontPageOrders(startDate: string, endDate: string): Promise<IGetOrders> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const { data: orders, error: ordersError } = await supabase
      .from('dynamic_orders')
      .select('status, total_price, created_at')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })

    if (ordersError) {
      throw new Error('Erro ao pegar as vendas')
    }

    return { data: orders, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
