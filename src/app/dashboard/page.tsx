import getFrontPageOrders from '@/actions/get-front-page-orders'
import DashboardActions from '@/components/dashboard/dashboard-actions'
import DashboardDateFilter from '@/components/dashboard/dashboard-date-filter'
import DashboardSales from '@/components/dashboard/dashboard-sales'
import DashboardSalesLineGraph from '@/components/dashboard/dashboard-sales-line-graph'
import BaseCard from '@/components/ui/base-card'
interface ISearchParamsProps {
  searchParams: Promise<{
    startDate: string
    endDate: string
  }>
}
export type TOrderStatus = 'cancelled' | 'delivered' | 'shipped' | 'pending'

export default async function DashboardPage({ searchParams }: ISearchParamsProps) {
  const currSearchParams = await searchParams

  const startDate = currSearchParams.startDate || (new Date().toISOString().split('T')[0] as string)
  const endDate = currSearchParams.endDate || (new Date().toISOString().split('T')[0] as string)

  const { data: orders } = await getFrontPageOrders(startDate, endDate)
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
    <main className="container flex flex-col gap-4 sm:gap-8">
      <section>
        <BaseCard className="mt-4 sm:mt-8 flex flex-col gap-8 xl:gap-16">
          <DashboardSales totalSalesByStatus={totalSalesByStatus} />
          <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 justify-evenly">
            <DashboardDateFilter />
            <DashboardActions />
          </div>
        </BaseCard>
      </section>
      <section>
        <BaseCard>
          <DashboardSalesLineGraph orders={orders} />
        </BaseCard>
      </section>
    </main>
  )
}
