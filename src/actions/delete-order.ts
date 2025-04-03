'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'

export interface IDeleteOrder {
  data: null
  error: string
  ok: boolean
}

export default async function deleteOrder(orderId: string): Promise<IDeleteOrder> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const { error: ordersError } = await supabase.from('orders').delete().eq('id', orderId)

    if (ordersError) {
      throw new Error('Erro ao deletar a venda')
    }

    return { data: null, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
