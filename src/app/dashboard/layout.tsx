import SideMenu from '@/components/side-menu'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data || !data.user) redirect('/login')
  return (
    <div className="md:grid md:grid-cols-[200px_auto] min-[824px]:grid-cols-[250px_auto] lg:grid-cols-[350px_auto] mx-4 sm:mx-8 gap-6 lg:gap-11">
      <SideMenu />
      {children}
    </div>
  )
}
