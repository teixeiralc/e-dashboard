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
import { useActionState, useEffect, useState } from 'react'
import newProduct from '@/actions/new-product'
import { toast } from 'sonner'
import { useFormStatus } from 'react-dom'
import { Input } from './ui/input'

function FormButton() {
  const { pending } = useFormStatus()
  const className = 'bg-zinc-800 hover:text-teal-400 font-body font-bold text-xs text-zinc-100 drop-shadow-md mt-2'

  return pending ? (
    <Button className={className} disabled={pending}>
      Adicionando...
    </Button>
  ) : (
    <Button className={className}>Adicionar</Button>
  )
}

export default function AddProduct() {
  const [open, setOpen] = useState(false)

  const [state, action] = useActionState(newProduct, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.error !== '') {
      setOpen(false)
      toast.error(state.error)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:text-teal-400 text-base font-body">Adicionar Produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] relative">
        <DialogHeader>
          <DialogTitle>Adicionar produto</DialogTitle>
          <DialogDescription>Preencha todos os campos abaixo.</DialogDescription>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-2 mt-4">
          <Input type="text" id="name" name="name" required placeholder="Nome" />
          <Input type="text" id="description" name="description" required placeholder="Descrição" />
          <Input type="number" step="any" id="buy_price" name="buy_price" required placeholder="Preço de Custo" />
          <Input type="number" step="any" id="retail_price" name="retail_price" required placeholder="Preço de Venda" />
          <Input type="number" id="stock" name="stock" required placeholder="Estoque" />
          <Input type="text" id="category" name="category" required placeholder="Categoria" />
          <FormButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}
