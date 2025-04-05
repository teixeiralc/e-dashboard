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

import getOrder from '@/actions/get-order'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import EditOrderStatus from '@/components/edit-order-status'
import DeleteOrder from '@/components/delete-order'

interface IVendaIdParams {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: IVendaIdParams) {
  const orderParams = await params
  const { data: order } = await getOrder(orderParams.id)

  if (!order) return { title: 'Venda | e-Dashboard' }
  return {
    title: `Venda ${order.id.length > 5 ? `${order.id.slice(0, 5)}...` : order.id} | e-Dashboard`,
  }
}

export default async function VendaIdPage({ params }: IVendaIdParams) {
  const productParams = await params
  const orderId = productParams.id

  const { data: order } = await getOrder(orderId)
  if (!order)
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
                  <Link href="/dashboard/vendas">Vendas</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>...</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md">
            Venda não encontrada
          </h1>
        </BaseCard>
      </main>
    )

  const { data: product } = await getProduct(order.product_id)

  const orderFormattedTotalValue = formatCurrency(order.total_price)
  let orderFormattedStatus
  switch (order.status) {
    case 'cancelled':
      orderFormattedStatus = 'Cancelado'
      break
    case 'pending':
      orderFormattedStatus = 'Pendente | Em andamento'
      break
    case 'shipped':
      orderFormattedStatus = 'Enviado | Em andamento'
      break
    case 'delivered':
      orderFormattedStatus = 'Finalizado'
      break
  }
  const orderFormattedDate = format(new Date(order.created_at), 'dd/MMM/yyyy', { locale: ptBR })

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
                <Link href="/dashboard/vendas">Vendas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{order.id.length > 5 ? `${order.id.slice(0, 5)}...` : order.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl sm:text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md">
            {order.id}
          </h1>
          <div className="max-w-120">
            <ul className="mb-6 space-y-3 sm:space-y-1">
              <li>
                <span className="font-bold">Produto:</span> <p className="font-data inline-block">{product?.name}</p>
              </li>
              <li>
                <span className="font-bold">E-mail do cliente:</span>{' '}
                <p className="font-data inline-block">{order.customer_email}</p>
              </li>
              <li>
                <span className="font-bold">Quantidade:</span>{' '}
                <p className="font-data inline-block">{order.quantity}</p>
              </li>
              <li>
                <span className="font-bold">Valor total:</span>{' '}
                <p className={`font-data inline-block`}>R$ {orderFormattedTotalValue}</p>
              </li>
              <li>
                <span className="font-bold">Status:</span>{' '}
                <p className="font-data inline-block">{orderFormattedStatus}</p>
              </li>
              <li>
                <span className="font-bold">Data da venda:</span>{' '}
                <p className="font-data inline-block">{orderFormattedDate}</p>
              </li>
            </ul>
            <div className="flex flex-col min-[360px]:flex-row gap-2 min-[360px]:gap-4 items-center">
              <EditOrderStatus orderId={orderId} />
              <DeleteOrder orderId={orderId} />
            </div>
          </div>
        </div>
      </BaseCard>
    </main>
  )
}
