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
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { Label } from './ui/label'
import updateOrder from '@/actions/update-order'

function FormButton() {
  const { pending } = useFormStatus()
  const className = 'bg-zinc-800 hover:text-teal-400 font-body font-bold text-xs text-white drop-shadow-md mt-2'

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

export default function EditOrderStatus({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false)

  const [state, action] = useActionState(updateOrder, {
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
        redirect(`/dashboard/vendas/${orderId}`)
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [state, orderId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="text-sm sm:text-base">
          Editar
          <SquarePen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl max-w-[300px] sm:max-w-[400px] relative">
        <DialogHeader>
          <DialogTitle>Editar status da venda</DialogTitle>
          <DialogDescription>Preencha o campo abaixo com um dos status.</DialogDescription>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-2 mt-4">
          <Label htmlFor="status">Status</Label>
          <Input type="text" id="status" name="status" placeholder="Cancelado | Pendente | Enviado | Entregue" />
          <Input type="hidden" id="id" name="id" value={orderId} />
          <FormButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}
