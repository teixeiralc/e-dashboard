import getProduct from '@/actions/get-product'
import BaseCard from '@/components/ui/base-card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

import DeleteProduct from '@/components/delete-product'
import getOrdersForProduct from '@/actions/get-order-for-product'
import EditProduct from '@/components/edit-product'

interface IProdutoIdParams {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: IProdutoIdParams) {
  const productParams = await params
  const { data: product } = await getProduct(productParams.id)

  if (!product) return { title: 'Produto | e-Dashboard' }
  return {
    title: `${product.name} | e-Dashboard`,
  }
}

export default async function ProdutoIdPage({ params }: IProdutoIdParams) {
  const productParams = await params
  const productId = productParams.id

  const { data: product } = await getProduct(productId)
  if (!product)
    return (
      <main className="container">
        <BaseCard className="mt-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/produtos">Produtos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>...</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md">
            Produto não encontrado
          </h1>
        </BaseCard>
      </main>
    )

  const { data: ordersForProduct } = await getOrdersForProduct(productId)

  const sumOfOrdersByStatus = ordersForProduct?.reduce(
    (acc, cur) => {
      if (cur.status === 'delivered') {
        return { ...acc, finished: acc.finished + cur.total_price }
      }
      if (cur.status === 'pending' || cur.status === 'shipped') {
        return { ...acc, ongoing: acc.ongoing + cur.total_price }
      }
      if (cur.status === 'cancelled') {
        return { ...acc, cancelled: acc.cancelled + cur.total_price }
      }
      return acc
    },
    { finished: 0, ongoing: 0, cancelled: 0 },
  )

  const balance = product.retail_price - product.buy_price

  const formattedProduct = {
    ...product,
    balance: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(product.retail_price - product.buy_price),
    buy_price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(product.buy_price),
    retail_price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(product.retail_price),
  }

  return (
    <section className="container">
      <BaseCard className="mt-4 sm:mt-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/produtos">Produtos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl sm:text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md">
            {formattedProduct.name}
          </h1>
          <div className="max-w-120">
            <p className="text-lg sm:text-xl text-zinc-900 mb-4 text-wrap">{formattedProduct.description}</p>
            <ul className="mb-6">
              <li>
                Categoria: <p className="font-data inline-block">{formattedProduct.category}</p>
              </li>
              <li>
                Preço de Custo: <p className="font-data inline-block">{formattedProduct.buy_price}</p>
              </li>
              <li>
                Preço de Venda: <p className="font-data inline-block">{formattedProduct.retail_price}</p>
              </li>
              <li>
                Saldo por venda:{' '}
                <p className={`font-data inline-block ${balance > 0 ? 'text-green-700' : 'text-error'}`}>
                  {formattedProduct.balance}
                </p>
              </li>
              <li>
                Estoque: <p className="font-data inline-block">{formattedProduct.stock}</p>
              </li>
              {ordersForProduct && (
                <div className="mt-4">
                  <li>
                    Quantidade de vendas: <p className="font-data inline-block">{ordersForProduct.length}</p>
                  </li>
                  <li>
                    Vendas finalizadas:{' '}
                    <p className="font-data inline-block text-green-700">
                      {sumOfOrdersByStatus?.finished?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </li>
                  <li>
                    Vendas em andamento:{' '}
                    <p className="font-data inline-block text-orange-400">
                      {sumOfOrdersByStatus?.ongoing?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </li>
                  <li>
                    Vendas canceladas:{' '}
                    <p className="font-data inline-block text-red-800">
                      {sumOfOrdersByStatus?.cancelled?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </li>
                </div>
              )}
            </ul>
            <div className="flex flex-col min-[360px]:flex-row gap-2 min-[360px]:gap-4 items-center">
              <EditProduct productId={productId} />
              <DeleteProduct productId={formattedProduct.id} productName={formattedProduct.name} />
            </div>
          </div>
        </div>
      </BaseCard>
    </section>
  )
}
