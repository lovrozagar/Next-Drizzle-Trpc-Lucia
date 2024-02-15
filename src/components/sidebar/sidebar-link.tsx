import Link from 'next/link'

import { SidebarLinkType } from '@/components/sidebar/sidebar-link-type'

const SidebarLink = ({
  link,
  active,
}: Readonly<{
  link: SidebarLinkType
  active: boolean
}>) => (
  <Link
    href={link.href}
    className={`group inline-block w-full rounded-md p-2 text-xs text-muted-foreground transition-colors hover:bg-popover hover:text-primary hover:shadow${
      active ? ' font-semibold text-primary' : ''
    }`}
  >
    <div className='flex items-center'>
      <div
        className={`absolute left-0 h-6 w-[4px] rounded-r-lg bg-primary opacity-0${
          active ? ' opacity-100' : ''
        }`}
      />
      <link.icon className='mr-1 h-3.5' />
      <span>{link.title}</span>
    </div>
  </Link>
)

export { SidebarLink }
export type { SidebarLinkType }
