'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'

export default async function updateProduct(state: object, formData: FormData) {
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

    const productId = formData.get('id') as string | null
    if (!productId) {
      throw new Error('ID do produto não fornecido.')
    }

    const name = formData.get('name') as string | null
    const description = formData.get('description') as string | null
    const buyPrice = formData.get('buy_price') as string | null
    const retailPrice = formData.get('retail_price') as string | null
    const stock = formData.get('stock') as string | null
    const category = formData.get('category') as string | null

    const updatedFields: Record<string, string | number> = {}

    if (name) updatedFields.name = name
    if (description) updatedFields.description = description
    if (buyPrice) updatedFields.buy_price = parseFloat(buyPrice)
    if (retailPrice) updatedFields.retail_price = parseFloat(retailPrice)
    if (stock) updatedFields.stock = parseInt(stock)
    if (category) updatedFields.category = category

    if (Object.keys(updatedFields).length === 0) {
      return { data: null, ok: true, error: '' }
    }

    const { error: updateError } = await supabase
      .from('products')
      .update(updatedFields)
      .match({ id: productId, store_id: store.id })

    if (updateError) {
      throw new Error('Erro ao atualizar o produto.')
    }

    return { data: null, ok: true, error: '' }
  } catch (error) {
    return actionError(error)
  }
}
