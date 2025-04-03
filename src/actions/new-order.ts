'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { daysUntilTargetDate } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function newOrder(state: object, formData: FormData) {
  const supabase = await createClient()

  const uuid = crypto.randomUUID()

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

    const productId = formData.get('productId') as string | null
    const customerEmail = formData.get('customer_email') as string | null
    const quantity = formData.get('quantity') as string | null
    const totalPrice = formData.get('total_price') as string | null
    let status = formData.get('status') as string | null

    if (!productId || !customerEmail || !quantity || !status || !totalPrice)
      throw new Error('Preencha todos os dados do produto.')
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

    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + (daysUntilTargetDate('2025-03-23') + 1))
    const dateMinus7Days = currentDate.toISOString()

    const newOrder = {
      id: uuid,
      product_id: productId,
      customer_email: customerEmail,
      quantity: parseInt(quantity),
      total_price: parseFloat(totalPrice),
      status,
      created_at: dateMinus7Days,
      store_id: store.id,
    }

    const { error: insertError } = await supabase.from('orders').insert([newOrder]).single()

    if (insertError) {
      console.log(insertError)
      throw new Error('Erro ao adicionar a venda.')
    }
  } catch (error) {
    return actionError(error)
  }
  redirect(`/dashboard/vendas/${uuid}`)
}
