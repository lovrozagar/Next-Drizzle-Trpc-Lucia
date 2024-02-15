import Link from 'next/link'

import SidebarItems from '@/components/sidebar/sidebar-items'
import { getUserAuth } from '@/lib/auth/utils'

const Sidebar = async () => {
  const session = await getUserAuth()

  if (session.session === null) return null

  const { user } = session.session

  return (
    <aside className='hidden h-screen min-w-52 border-r border-border bg-muted p-4 pt-8 shadow-inner md:block'>
      <div className='flex h-full flex-col justify-between'>
        <div className='space-y-4'>
          <h3 className='ml-4 text-lg font-semibold'>Logo</h3>
          <SidebarItems />
        </div>
        {!user?.name || user.name.length === 0 ? (
          <Link href='/account'>
            <div className='flex w-full items-center justify-between border-t border-border px-2 pt-4'>
              <div className='text-muted-foreground'>
                <p className='text-xs'>{user.name ?? 'John Doe'}</p>
                <p className='pr-4 text-xs font-light'>{user.email ?? 'john@doe.com'}</p>
              </div>
              <div className='rounded-full border-2 border-border p-1.5 text-muted-foreground'>
                {user.name
                  ? user.name
                      ?.split(' ')
                      .map((word) => word[0].toUpperCase())
                      .join('')
                  : '~'}
              </div>
            </div>
          </Link>
        ) : null}
      </div>
    </aside>
  )
}

export { Sidebar }
