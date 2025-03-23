'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { IOrder } from '@/lib/types/order-type'

interface IGetOrders {
  data: IOrder[] | null
  error: string
  ok: boolean
}

export default async function getOrders(startDate: string, endDate: string): Promise<IGetOrders> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (storeError || !store) {
      throw new Error('Loja não encontrada')
    }

    const { data: orders, error: ordersError } = await supabase
      .from('dynamic_orders')
      .select('*')
      .eq('store_id', store.id)
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
