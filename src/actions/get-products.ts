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

    const { data: products, error: productsError } = await supabase.from('products').select('*')

    if (productsError) {
      throw new Error('Erro ao pegar os produtos')
    }

    return { data: products, error: '', ok: true }
  } catch (error) {
    return actionError(error)
  }
}
