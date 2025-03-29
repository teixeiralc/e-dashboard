'use client'

import { Button } from '@/components/ui/button'
import { Save, SquarePen } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from './ui/input'
import updateProduct from '@/actions/update-product'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

function FormButton() {
  const { pending } = useFormStatus()
  const className = 'bg-zinc-800 hover:text-teal-400 font-body font-bold text-xs text-zinc-100 drop-shadow-md mt-2'

  return pending ? (
    <Button className={className} disabled={pending}>
      Salvando... <Save className="h-3 w-3" />
    </Button>
  ) : (
    <Button className={className}>
      Salvar <Save className="h-3 w-3" />
    </Button>
  )
}

export default function EditProduct({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false)

  const [state, action] = useActionState(updateProduct, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.error !== '') {
      toast.error(state.error)
    }
    if (state.ok) {
      setOpen(false)
      const timeout = setTimeout(() => {
        redirect(`/dashboard/produtos/${productId}`)
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [state, productId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="text-base">
          Editar
          <SquarePen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] relative">
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>Preencha os campos que deseja editar.</DialogDescription>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-2 mt-4">
          <Input type="text" id="name" name="name" placeholder="Nome" />
          <Input type="text" id="description" name="description" placeholder="Descrição" />
          <Input type="number" step="any" id="buy_price" name="buy_price" placeholder="Preço de Custo" />
          <Input type="number" step="any" id="retail_price" name="retail_price" placeholder="Preço de Venda" />
          <Input type="number" id="stock" name="stock" placeholder="Estoque" />
          <Input type="text" id="category" name="category" placeholder="Categoria" />
          <Input type="hidden" id="id" name="id" value={productId} />
          <FormButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}
