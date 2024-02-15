'use client'

import { UpdateEmailCard } from '@/app/(app)/account/update-email-card'
import { UpdateNameCard } from '@/app/(app)/account/update-name-card'
import { AuthSession } from '@/lib/auth/utils'

 function UserSettings({
  session,
}: Readonly<{
  session: AuthSession['session']
}>) {
  return (
    <>
      <UpdateNameCard name={session?.user.name ?? ''} />
      <UpdateEmailCard email={session?.user.email ?? ''} />
    </>
  )
}

export { UserSettings }