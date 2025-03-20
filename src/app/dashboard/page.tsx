import BaseCard from '@/components/ui/base-card'
import WidgetCard from '@/components/ui/widget-card'
import { createClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data || !data.user) return null
  return (
    <main className="container">
      <BaseCard className="mt-8 flex justify-evenly gap-16">
        <WidgetCard>Teste</WidgetCard>
        <WidgetCard>
          <span className="text-xl text-base-5 font-body">R$</span>
          <span className="text-5xl text-base-5 font-body">106.3K</span>
        </WidgetCard>
        <WidgetCard>Teste</WidgetCard>
      </BaseCard>
    </main>
  )
}
