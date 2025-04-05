'use client'

import { Button } from './ui/button'
import { useActionState, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useFormStatus } from 'react-dom'
import { Input } from './ui/input'
import newOrder from '@/actions/new-order'
import getProductClient from '@/actions/get-product-client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

function FormButton() {
  const { pending } = useFormStatus()
  const className = 'bg-zinc-800 hover:text-teal-400 font-body  text-base text-white drop-shadow-md mt-2 '

  return pending ? (
    <Button className={className} disabled={pending}>
      Adicionando...
    </Button>
  ) : (
    <Button className={className}>Adicionar</Button>
  )
}

export default function AddOrder({ products }: { products: { id: string; name: string }[] | null }) {
  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState('')
  const [customer, setCustomer] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [status, setStatus] = useState('')

  // products combobox
  const [open, setOpen] = useState(false)

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
    <div>
      <h1 className="text-3xl sm:text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md">
        Adicionar Venda
      </h1>
      <p className="font-body text-zinc-700 text-sm sm:text-base">Preencha todos os campos abaixo.</p>
      <form action={action} className="flex flex-col gap-2 mt-4 max-w-lg text-zinc-700 font-body text-base">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between font-normal"
            >
              {productName
                ? products?.find((product) => product.name === productName)?.name
                : 'Selecione um produto...'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Command>
              <CommandInput placeholder="Procure um produto..." className="h-9" />
              <CommandList>
                <CommandEmpty>
                  Nenhum produto
                  <br />
                  encontrado.
                </CommandEmpty>
                <CommandGroup>
                  {products?.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.name}
                      onSelect={(currentValue) => {
                        setProductName(currentValue === productName ? '' : currentValue)
                        setOpen(false)
                      }}
                    >
                      {product.name}
                      <Check className={cn('ml-auto', productName === product.name ? 'opacity-100' : 'opacity-0')} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
    </div>
  )
}
