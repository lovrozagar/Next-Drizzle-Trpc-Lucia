'use client'

import { usePathname } from 'next/navigation'

import { SidebarLink, SidebarLinkType } from '@/components/sidebar/sidebar-link'

const SidebarLinkGroup = ({
  links,
  title,
  border,
}: Readonly<{
  links: SidebarLinkType[]
  title?: string
  border?: boolean
}>) => {
  const fullPathname = usePathname()
  const pathname = `/${fullPathname.split('/')[1]}`

  return (
    <div className={border ? 'my-8 border-t border-border pt-4' : ''}>
      {title ? (
        <h4 className='mb-2 px-2 text-xs uppercase tracking-wider text-muted-foreground'>
          {title}
        </h4>
      ) : null}
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <SidebarLink link={link} active={pathname === link.href} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarLinkGroup
