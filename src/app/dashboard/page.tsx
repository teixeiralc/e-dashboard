import DashboardActions from '@/components/dashboard-actions'
import DashboardDateFilter from '@/components/dashboard-date-filter'
import BaseCard from '@/components/ui/base-card'
import WidgetCard from '@/components/ui/widget-card'

export default async function PrivatePage() {
  return (
    <main className="container">
      <section>
        <BaseCard className="mt-8 flex flex-col gap-16">
          <div className="flex justify-evenly gap-16">
            <WidgetCard legend="Aprovado" statusColor="success" className="max-w-72 items-center justify-center flex">
              <span className="text-xl text-zinc-900 font-body">R$</span>
              <span className="text-5xl text-zinc-900 font-body font-medium">226.2K</span>
            </WidgetCard>
            <WidgetCard
              legend="Em andamento"
              statusColor="warning"
              className="max-w-72 items-center justify-center flex"
            >
              <span className="text-xl text-zinc-900 font-body">R$</span>
              <span className="text-5xl text-zinc-900 font-body font-medium">106.3K</span>
            </WidgetCard>
            <WidgetCard legend="Cancelado" statusColor="error" className="max-w-72 items-center justify-center flex">
              <span className="text-xl text-zinc-900 font-body">R$</span>
              <span className="text-5xl text-zinc-900 font-body font-medium">76.5K</span>
            </WidgetCard>
          </div>
          <div className="flex gap-8 justify-evenly">
            <DashboardDateFilter />
            <DashboardActions />
          </div>
        </BaseCard>
      </section>
    </main>
  )
}
