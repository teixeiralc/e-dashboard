'use client'

import deleteOrder from '@/actions/delete-order'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

export default function DeleteOrder({ orderId }: { orderId: string }) {
  async function handleOrderDelete() {
    const { error, ok } = await deleteOrder(orderId)
    if (error !== '' || !ok) {
      return toast.error(error)
    }

    if (ok) {
      toast.success('Venda deletada com sucesso.')
      redirect('/dashboard/vendas')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="text-sm sm:text-base">
          Deletar Venda
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que quer deletar a venda?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser revertida. A venda {orderId} será permanentemente removida da base de dados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={handleOrderDelete}>
            Tenho certeza
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
