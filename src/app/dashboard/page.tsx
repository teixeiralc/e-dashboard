import { createClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data || !data.user) return null
  return (
    <div>
      Hello {data.user.email}
    </div>
  )
}
