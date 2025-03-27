import getOrders from '@/actions/get-orders'
import DashboardActions from '@/components/dashboard/dashboard-actions'
import DashboardDateFilter from '@/components/dashboard/dashboard-date-filter'
import DashboardSalesLineGraph from '@/components/dashboard/dashboard-sales-line-graph'
import BaseCard from '@/components/ui/base-card'
import WidgetCard from '@/components/ui/widget-card'
import { formatCurrency } from '@/lib/utils'

interface IPageProps {
  searchParams: Promise<{
    startDate: string
    endDate: string
  }>
}
type TOrderStatus = 'cancelled' | 'delivered' | 'shipped' | 'pending'

export default async function DashboardPage({ searchParams }: IPageProps) {
  const currSearchParams = await searchParams

  const startDate = currSearchParams.startDate || (new Date().toISOString().split('T')[0] as string)
  const endDate = currSearchParams.endDate || (new Date().toISOString().split('T')[0] as string)

  const { data: orders } = await getOrders(startDate, endDate)
  if (!orders) return null

  const totalSalesByStatus = orders.reduce(
    (acc: Record<TOrderStatus, number>, order) => {
      acc[order.status] = Number(((acc[order.status] || 0) + order.total_price).toFixed(2))
      return acc
    },
    {
      cancelled: 0,
      delivered: 0,
      shipped: 0,
      pending: 0,
    },
  )

  return (
    <main className="container flex flex-col gap-8">
      <section>
        <BaseCard className="mt-8 flex flex-col gap-16">
          <div className="flex justify-evenly gap-16">
            <WidgetCard legend="Aprovado" statusColor="success" className="max-w-72 items-center justify-center flex">
              <span className="text-xl text-zinc-900 font-body">R$</span>
              <span className="text-5xl text-zinc-900 font-body font-medium">
                {formatCurrency(totalSalesByStatus.delivered)}
              </span>
            </WidgetCard>
            <WidgetCard
              legend="Em andamento"
              statusColor="warning"
              className="max-w-72 items-center justify-center flex"
            >
              <span className="text-xl text-zinc-900 font-body">R$</span>
              <span className="text-5xl text-zinc-900 font-body font-medium">
                {formatCurrency(totalSalesByStatus.shipped + totalSalesByStatus.pending)}
              </span>
            </WidgetCard>
            <WidgetCard legend="Cancelado" statusColor="error" className="max-w-72 items-center justify-center flex">
              <span className="text-xl text-zinc-900 font-body">R$</span>
              <span className="text-5xl text-zinc-900 font-body font-medium">
                {formatCurrency(totalSalesByStatus.cancelled)}
              </span>
            </WidgetCard>
          </div>
          <div className="flex gap-8 justify-evenly">
            <DashboardDateFilter />
            <DashboardActions />
          </div>
        </BaseCard>
      </section>
      <section>
        <BaseCard className="h-[450px]">
          <DashboardSalesLineGraph orders={orders} />
        </BaseCard>
      </section>
    </main>
  )
}
