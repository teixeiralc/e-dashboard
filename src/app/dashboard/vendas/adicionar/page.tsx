import getProductsId from '@/actions/get-products-id'
import AddOrder from '@/components/add-order'
import BaseCard from '@/components/ui/base-card'

export default async function VendasAdicionarPage() {
  const { data: products } = await getProductsId()

  return (
    <main>
      <BaseCard className="mt-8">
        <AddOrder products={products} />
      </BaseCard>
    </main>
  )
}
