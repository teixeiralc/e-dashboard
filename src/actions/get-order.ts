import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { IOrder } from '@/lib/types/db-types'

export interface IGetOrder {
  data: IOrder | null
  error: string
  ok: boolean
}

export default async function getOrder(orderId: string): Promise<IGetOrder> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const { data: order, error: orderError } = await supabase
      .from('dynamic_orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError) {
      throw new Error('Erro ao pegar a venda')
    }

    return { data: order, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
