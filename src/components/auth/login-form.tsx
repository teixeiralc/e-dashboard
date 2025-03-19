'use client'

import { login } from '@/actions/login'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Link from 'next/link'
import { toast } from 'sonner'

function FormButton() {
  const { pending } = useFormStatus()
  const className =
    'bg-prim-4 text-prim-1 font-body uppercase font-bold text-base hover:bg-prim-1 hover:text-prim-4 drop-shadow-md'

  return pending ? (
    <Button className={className} disabled={pending}>
      Entrando...
    </Button>
  ) : (
    <Button className={className}>Entrar</Button>
  )
}

export default function LoginForm() {
  const [state, action] = useActionState(login, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.error !== '') {
      toast.error(state.error)
    }
  }, [state.error])

  return (
    <form action={action} className="flex flex-col gap-4 w-80">
      <div>
        <Label htmlFor="email" className="mb-1">
          E-mail -
        </Label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div>
        <Label htmlFor="password" className="mb-1">
          Senha -
        </Label>
        <Input type="password" id="password" name="password" required />
      </div>
      <div className="flex self-end gap-4">
        <Link href="/login/cadastrar" className="text-base-4 font-data text-xs underline self-start hover:text-prim-3">
          Ainda não tem uma conta? Cadastre-se
        </Link>
        <FormButton />
      </div>
    </form>
  )
}
