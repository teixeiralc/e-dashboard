'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'

export interface IDeleteProduct {
  data: null
  error: string
  ok: boolean
}

export default async function deleteProduct(productId: string): Promise<IDeleteProduct> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const { error: productsError } = await supabase.from('products').delete().eq('id', productId)

    if (productsError) {
      throw new Error('Erro ao deletar o produtos')
    }

    return { data: null, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
