import getOrders from '@/actions/get-orders'
import getProductsId from '@/actions/get-products-id'
import AddOrder from '@/components/add-order'
import { ordersColumns } from '@/components/dashboard/vendas/columns'
import { DataTable } from '@/components/dashboard/vendas/vendas-data-table'
import { ExportToExcel } from '@/components/export-to-excel'
import BaseCard from '@/components/ui/base-card'
import { IFormattedOrder } from '@/lib/types/db-types'

export async function generateMetadata() {
  return {
    title: `Vendas | e-Dashboard`,
  }
}

export default async function VendasPage() {
  const startDate = new Date('01/01/2023').toISOString().split('T')[0] as string
  const endDate = new Date().toISOString().split('T')[0] as string

  const { data: orders, ok, error } = await getOrders(startDate, endDate)
  const { data: products } = await getProductsId()

  if (!orders?.length || !ok || error)
    return (
      <BaseCard className="mt-8 mb-8">
        <p>Nenhum produto encontrado.</p>
      </BaseCard>
    )

  const formattedOrders = orders.map((order) => {
    const product = products?.find((p) => p.id === order.product_id)
    let formattedStatus
    switch (order.status) {
      case 'pending':
        formattedStatus = 'Em andamento'
        break
      case 'shipped':
        formattedStatus = 'Em andamento'
        break
      case 'delivered':
        formattedStatus = 'Aprovado'
        break
      case 'cancelled':
        formattedStatus = 'Cancelado'
        break
    }
    return {
      id: order.id,
      product: product ? product.name : 'Unknown Product',
      customer_email: order.customer_email,
      quantity: order.quantity,
      total_price: order.total_price,
      status: formattedStatus,
      created_at: order.created_at,
    }
  }) as IFormattedOrder[]

  return (
    <main className="container flex flex-col gap-8">
      <section>
        <BaseCard className="mt-8 flex flex-col gap-16">
          <h1 className="text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md">Vendas</h1>
          <div className="flex items-center justify-end gap-2">
            <ExportToExcel<IFormattedOrder> data={formattedOrders} fileName="Vendas" />
            <AddOrder products={products} />
          </div>
        </BaseCard>
      </section>
      <section className="h-full mb-8">
        <BaseCard className="h-full">
          {formattedOrders ? (
            <DataTable columns={ordersColumns} data={formattedOrders} />
          ) : (
            <p>Nenhuma venda encontrada</p>
          )}
        </BaseCard>
      </section>
    </main>
  )
}
