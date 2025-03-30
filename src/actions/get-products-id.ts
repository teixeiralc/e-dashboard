import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'

export interface IGetProductId {
  data: { id: string; name: string }[] | null
  error: string
  ok: boolean
}

export default async function getProductsId(): Promise<IGetProductId> {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Não autorizado')
    }

    const { data: products, error: productsError } = await supabase.from('products').select('id, name')

    if (productsError) {
      throw new Error('Erro ao pegar o produto')
    }

    return { data: products, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
