'use client'

import { signup } from '@/actions/login'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner'

function FormButton() {
  const { pending } = useFormStatus()
  const className = 'bg-zinc-800 text-teal-400 font-body uppercase font-bold text-base hover:text-white drop-shadow-md'

  return pending ? (
    <Button className={className} disabled={pending}>
      Cadastrando...
    </Button>
  ) : (
    <Button className={className}>Cadastrar</Button>
  )
}

export default function SignUpForm() {
  const [state, action] = useActionState(signup, {
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
        <Input type="email" id="email" name="email" required placeholder="seu@email" />
      </div>
      <div>
        <Label htmlFor="password" className="mb-1">
          Senha -
        </Label>
        <Input type="password" id="password" name="password" required placeholder="sua senha" />
      </div>
      <div className="flex self-end gap-4">
        <FormButton />
      </div>
    </form>
  )
}
