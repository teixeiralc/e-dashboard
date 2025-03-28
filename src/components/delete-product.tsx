'use client'

import deleteProduct from '@/actions/delete-product'
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

export default function DeleteProduct({ productId, productName }: { productId: string; productName: string }) {
  async function handleProductDelete() {
    const { error, ok } = await deleteProduct(productId)
    if (error !== '' || !ok) {
      return toast.error(error)
    }

    if (ok) {
      toast('Produto deletado com sucesso.')
      redirect('/dashboard/produtos')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="text-base">
          Deletar Produto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que quer deletar o produto?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser revertida. O produto {productName} será permanentemente removido da sua base de
            dados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={handleProductDelete}>
            Tenho certeza
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
