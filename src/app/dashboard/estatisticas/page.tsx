import getFrontPageOrders from '@/actions/get-front-page-orders'
import getOrders from '@/actions/get-orders'
import getProduct from '@/actions/get-product'
import DashboardHorizontalBarGraph from '@/components/dashboard/dashboard-horizontal-bar-graph'
import DashboardSalesLineGraph from '@/components/dashboard/dashboard-sales-line-graph'
import BaseCard from '@/components/ui/base-card'
import Link from 'next/link'

interface OrderStats {
  total_sales: number
  total_orders: number
  average_ticket: number
  most_sold_product_id: string
  most_sold_product_name: string
  _productCount?: Record<string, number> // mark as optional
}

export async function generateMetadata() {
  return {
    title: `Estatísticas | e-Dashboard`,
  }
}

export default async function EstatisticasPage() {
  const { data: orders } = await getOrders('01/01/2024', '01/01/2050')
  const { data: salesLineGraphOrders } = await getFrontPageOrders('01/01/2024', '01/01/2050')

  if (!orders || !salesLineGraphOrders) {
    return (
      <main className="mt-8">
        <BaseCard>
          <p>Sem dados disponiveis no momento.</p>
        </BaseCard>
      </main>
    )
  }

  const orderStats = orders.reduce<OrderStats>(
    (acc, cur) => {
      const isFinished = cur.status === 'delivered'

      if (isFinished) {
        acc.total_sales += cur.total_price
        acc.total_orders += 1
      }

      if (!acc._productCount) acc._productCount = {}
      acc._productCount[cur.product_id] = (acc._productCount[cur.product_id] || 0) + cur.quantity

      return acc
    },
    {
      total_sales: 0,
      total_orders: 0,
      average_ticket: 0,
      most_sold_product_id: '',
      most_sold_product_name: '',
      _productCount: {} as Record<string, number>,
    },
  )
  if (orderStats && orderStats._productCount) {
    orderStats.average_ticket = orderStats.total_orders
      ? Number((orderStats.total_sales / orderStats.total_orders).toFixed(2))
      : 0

    const sortedProducts = Object.entries(orderStats._productCount).sort((a, b) => b[1] - a[1])

    orderStats.most_sold_product_id = sortedProducts[0]?.[0] || ''
    const mostSoldProduct = await getProduct(orderStats.most_sold_product_id)
    orderStats.most_sold_product_name = mostSoldProduct.data?.name || ''

    delete orderStats._productCount
  }

  return (
    <main className="container flex flex-col gap-8">
      <section>
        <BaseCard className="mt-8 flex-col gap-4 sm:gap-8 flex xl:flex-row xl:gap-24">
          <h1 className="text-3xl sm:text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md">
            Estatísticas
          </h1>
          <div className="w-[2px] bg-zinc-200 hidden xl:block" />
          <ul className="space-y-3 sm:space-y-1 text-zinc-700 text-sm sm:text-base">
            <li className="flex items-start">
              <p className="font-medium">
                💰 Total de vendas finalizadas:{' '}
                <span className="font-normal">
                  {orderStats?.total_sales.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                📦 Total de pedidos finalizados: <span className="font-normal">{orderStats?.total_orders}</span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                🛍️ Ticket medio:{' '}
                <span className="font-normal">
                  {orderStats?.average_ticket.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                🏆 Produto mais vendido:{' '}
                <Link
                  href={`/dashboard/produtos/${orderStats?.most_sold_product_id}`}
                  className="font-normal hover:underline"
                >
                  {orderStats?.most_sold_product_name}
                </Link>
              </p>
            </li>
          </ul>
        </BaseCard>
      </section>
      <section>
        <DashboardHorizontalBarGraph orders={orders} />
      </section>
      <section>
        <BaseCard>
          <DashboardSalesLineGraph orders={salesLineGraphOrders} />
        </BaseCard>
      </section>
    </main>
  )
}
