import getProducts from '@/actions/get-products'
import AddProduct from '@/components/add-product'
import { productColumns } from '@/components/dashboard/produtos/columns'
import { DataTable } from '@/components/data-table'
import { ExportToExcel } from '@/components/export-to-excel'
import BaseCard from '@/components/ui/base-card'
import { IProduct } from '@/lib/types/db-types'

export async function generateMetadata() {
  return {
    title: `Produtos | e-Dashboard`,
  }
}

export default async function ProdutosPage() {
  const { data, error, ok } = await getProducts()

  if (!data?.length || !ok || error)
    return (
      <BaseCard className="mt-8 mb-8">
        <p>Nenhum produto encontrado.</p>
      </BaseCard>
    )

  return (
    <main className="container flex flex-col gap-8">
      <section>
        <BaseCard className="mt-8 flex flex-col gap-16">
          <h1 className="text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md">Produtos</h1>
          <div className="flex items-center justify-end gap-2">
            <ExportToExcel<IProduct> data={data} fileName="Produtos" />
            <AddProduct />
          </div>
        </BaseCard>
      </section>
      <section className="h-full mb-8">
        <BaseCard className="h-full">
          {data ? <DataTable columns={productColumns} data={data} /> : <p>Nenhum produto encontrado.</p>}
        </BaseCard>
      </section>
    </main>
  )
}
