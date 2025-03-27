'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { IProduct } from '@/lib/types/db-types'

export interface IGetProducts {
  data: IProduct[] | null
  error: string
  ok: boolean
}

export default async function getProducts(): Promise<IGetProducts> {
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

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', store.id)
      .order('name', { ascending: true })

    if (productsError) {
      throw new Error('Erro ao pegar os prodtuos')
    }

    return { data: products, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
