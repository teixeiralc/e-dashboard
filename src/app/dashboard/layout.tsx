import SideMenu from '@/components/side-menu'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid grid-cols-[350px_auto] mx-8 gap-11">
      <SideMenu />
      {children}
    </div>
  )
}
