'use server'

import { createClient } from '@/lib/supabase/server'
import getProduct from './get-product'

export default async function updateStockOnNewOrder(productId: string, quantity: number) {
  const supabase = await createClient()
  const { data: product, error: getProductError } = await getProduct(productId)
  if (!product || getProductError)
    throw new Error(getProductError || 'Erro ao consultar o produto para atualizar o estoque')

  const currStock = product.stock
  if (currStock === 0) throw new Error('Produto fora de estoque.')
  if (currStock - quantity < 0)
    throw new Error(
      `Estoque insuficiente. ${product.name} possui apenas ${currStock} ${
        currStock === 1 ? 'unidade' : 'unidades'
      } em estoque.`,
    )

  const updatedStock = {
    stock: currStock - quantity,
  }

  const { error } = await supabase.from('products').update(updatedStock).match({ id: productId })
  if (error) throw new Error(error.message)

  return { data: null, error: '', ok: true }
}
