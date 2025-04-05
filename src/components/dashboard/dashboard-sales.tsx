import { formatCurrency } from '@/lib/utils'
import WidgetCard from '../ui/widget-card'

interface ITotalSalesByStatus {
  cancelled: number
  delivered: number
  shipped: number
  pending: number
}

export default async function DashboardSales({ totalSalesByStatus }: { totalSalesByStatus: ITotalSalesByStatus }) {
  return (
    <div className="flex justify-evenly gap-6 xl:gap-16 flex-wrap">
      <WidgetCard legend="Aprovado" statusColor="success" className="max-w-72 items-center justify-center flex">
        <span className="text-base lg:text-lg xl:text-xl text-zinc-900 font-body">R$</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-zinc-900 font-body font-medium">
          {formatCurrency(totalSalesByStatus.delivered)}
        </span>
      </WidgetCard>
      <WidgetCard legend="Em andamento" statusColor="warning" className="max-w-72 items-center justify-center flex">
        <span className="text-base lg:text-lg xl:text-xl text-zinc-900 font-body">R$</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-zinc-900 font-body font-medium">
          {formatCurrency(totalSalesByStatus.shipped + totalSalesByStatus.pending)}
        </span>
      </WidgetCard>
      <WidgetCard legend="Cancelado" statusColor="error" className="max-w-72 items-center justify-center flex">
        <span className="text-base lg:text-lg xl:text-xl text-zinc-900 font-body">R$</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-zinc-900 font-body font-medium">
          {formatCurrency(totalSalesByStatus.cancelled)}
        </span>
      </WidgetCard>
    </div>
  )
}
