interface IVendaIdParams {
  params: Promise<{
    id: string
  }>
}

export default async function VendaIdPage({ params }: IVendaIdParams) {
  const vendaParams = await params
  const vendaId = vendaParams.id
  return (
    <main>
      <h1>{vendaId}</h1>
    </main>
  )
}
