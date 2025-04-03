'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from './ui/button'
import { ReactNode, useActionState, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useFormStatus } from 'react-dom'
import { Input } from './ui/input'
import newOrder from '@/actions/new-order'
import getProductClient from '@/actions/get-product-client'

function FormButton() {
  const { pending } = useFormStatus()
  const className = 'bg-zinc-800 hover:text-teal-400 font-body font-bold text-xs text-white drop-shadow-md mt-2'

  return pending ? (
    <Button className={className} disabled={pending}>
      Adicionando...
    </Button>
  ) : (
    <Button className={className}>Adicionar</Button>
  )
}

export default function AddOrder({
  products,
  children,
}: {
  products: { id: string; name: string }[] | null
  children?: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState('')
  const [customer, setCustomer] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [status, setStatus] = useState('')

  const [state, action] = useActionState(newOrder, {
    ok: false,
    error: '',
    data: null,
  })

  const getProductPrice = useCallback(
    async (productName: string) => {
      if (!products) return null
      const product = products.find((item) => item.name.toLocaleLowerCase() === productName.toLocaleLowerCase())
      if (!product) return null
      const id = product.id
      setProductId(id)

      const { data } = await getProductClient(id)
      if (!data) return null
      const price = data.retail_price
      setTotalPrice(String(price * parseInt(quantity)))
    },
    [quantity, products],
  )

  useEffect(() => {
    if (state.error !== '') {
      setOpen(false)
      toast.error(state.error)
    }
  }, [state])

  useEffect(() => {
    async function getPrice() {
      await getProductPrice(productName)
    }
    getPrice()
  }, [productName, getProductPrice])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? children : <Button className="hover:text-teal-400 text-base font-body">Adicionar Venda</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] relative">
        <DialogHeader>
          <DialogTitle>Adicionar Venda</DialogTitle>
          <DialogDescription>Preencha todos os campos abaixo.</DialogDescription>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-2 mt-4">
          <Input
            type="text"
            id="product"
            name="product"
            required
            placeholder="Produto"
            value={productName}
            onChange={({ target }) => setProductName(target.value)}
          />
          <input type="hidden" id="productId" name="productId" value={productId} />
          <Input
            type="email"
            id="customer_email"
            name="customer_email"
            required
            placeholder="E-mail do Cliente"
            value={customer}
            onChange={({ target }) => setCustomer(target.value)}
          />
          <Input
            type="number"
            id="quantity"
            name="quantity"
            required
            placeholder="Quantidade"
            value={quantity}
            onChange={({ target }) => {
              setQuantity(target.value)
            }}
          />
          <Input
            type="number"
            step="any"
            id="total_price_display"
            name="total_price_display"
            required
            placeholder="Valor total"
            disabled
            value={totalPrice}
          />
          <input type="hidden" id="total_price" name="total_price" value={totalPrice} />
          <Input
            type="text"
            id="status"
            name="status"
            required
            placeholder="Cancelado | Pendente | Enviado | Entregue"
            value={status}
            onChange={({ target }) => setStatus(target.value)}
          />
          <FormButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}
