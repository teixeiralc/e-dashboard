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
  const className = 'bg-zinc-800 text-teal-400 font-body uppercase font-bold text-base hover:text-white drop-shadow-md'

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
  }, [state])

  return (
    <form action={action} className="flex flex-col gap-2 min-[400px]:gap-4 w-60 min-[450px]:w-80">
      <div>
        <Label htmlFor="email" className="mb-1">
          E-mail -
        </Label>
        <Input type="email" id="email" name="email" required placeholder="admin@email" />
      </div>
      <div>
        <Label htmlFor="password" className="mb-1">
          Senha -
        </Label>
        <Input type="password" id="password" name="password" required placeholder="@admin" />
      </div>
      <div className="flex flex-col-reverse min-[400px]:flex-row self-end gap-4">
        <Link
          href="/login/cadastrar"
          className="text-zinc-500 font-data text-xs underline self-start hover:text-teal-600"
        >
          Ainda não tem uma conta? Cadastre-se
        </Link>
        <FormButton />
      </div>
    </form>
  )
}
