'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function newProduct(state: object, formData: FormData) {
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

    const { error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', store.id)
      .order('name', { ascending: true })

    if (productsError) {
      throw new Error('Erro ao pegar os prodtuos')
    }

    const name = formData.get('name') as string | null
    const description = formData.get('description') as string | null
    const buyPrice = formData.get('buy_price') as string | null
    const retailPrice = formData.get('retail_price') as string | null
    const stock = formData.get('stock') as string | null
    const category = formData.get('category') as string | null

    if (!name || !description || !buyPrice || !retailPrice || !stock || !category)
      throw new Error('Preencha todos os dados do produto.')

    const newProduct = {
      id: uuid,
      name,
      description,
      buy_price: parseFloat(buyPrice),
      retail_price: parseFloat(retailPrice),
      stock: parseInt(stock),
      category,
      store_id: store.id,
    }

    const { error: insertError } = await supabase.from('products').insert([newProduct]).single()

    if (insertError) {
      throw new Error('Erro ao adicionar o produto.')
    }
  } catch (error) {
    return actionError(error)
  }
  redirect(`/dashboard/produtos/${uuid}`)
}
