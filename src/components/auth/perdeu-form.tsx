'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

function FormButton() {
  const { pending } = useFormStatus()
  const className = 'bg-zinc-800 text-teal-400 font-body uppercase font-bold text-base hover:text-white drop-shadow-md'

  return pending ? (
    <Button className={className} disabled={pending}>
      Enviando e-mail...
    </Button>
  ) : (
    <Button className={className}>Enviar e-mail</Button>
  )
}

export default function PerdeuForm() {
  const supabase = createClient()

  const [email, setEmail] = useState('')

  async function sendResetPassword() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) toast.error(error.message)
    if (data) toast.success('E-mail enviado', { description: 'Verifique sua caixa de entrada.' })
  }

  return (
    <form action={sendResetPassword} className="flex flex-col gap-4 w-80">
      <div>
        <Label htmlFor="email" className="mb-1">
          E-mail -
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="seu@email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div className="flex self-end gap-4">
        <FormButton />
      </div>
    </form>
  )
}
