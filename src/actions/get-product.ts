import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { IProduct } from '@/lib/types/db-types'

export interface IGetProduct {
  data: IProduct | null
  error: string
  ok: boolean
}

export default async function getProduct(productId: string): Promise<IGetProduct> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError) {
      throw new Error('Erro ao pegar o produto')
    }

    return { data: product, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
