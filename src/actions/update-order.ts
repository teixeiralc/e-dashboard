'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'

export default async function updateOrder(state: object, formData: FormData) {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const orderId = formData.get('id') as string | null
    if (!orderId) {
      throw new Error('ID da venda não fornecido.')
    }

    let status = formData.get('status') as string | null

    if (!status) throw new Error('Preencha o campod de status.')
    if (!['cancelado', 'pendente', 'enviado', 'entregue'].includes(status.toLocaleLowerCase())) {
      throw new Error('O status deve ser "Cancelado", "Pendente", "Enviado" ou "Entregue"')
    } else {
      switch (status.toLocaleLowerCase()) {
        case 'cancelado':
          status = 'cancelled'
          break
        case 'pendente':
          status = 'pending'
          break
        case 'enviado':
          status = 'shipped'
          break
        case 'entregue':
          status = 'delivered'
          break
      }
    }

    const updatedFields: Record<string, string | number> = {}

    if (status) updatedFields.status = status

    if (Object.keys(updatedFields).length === 0) {
      return { data: null, ok: true, error: '' }
    }

    const { error: updateError } = await supabase.from('orders').update(updatedFields).match({ id: orderId })

    if (updateError) {
      throw new Error('Erro ao atualizar a venda.')
    }

    return { data: null, ok: true, error: '' }
  } catch (error) {
    return actionError(error)
  }
}
