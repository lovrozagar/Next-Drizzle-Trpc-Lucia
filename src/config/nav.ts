import { Cog, HomeIcon } from 'lucide-react'

import { SidebarLinkType } from '@/components/sidebar/sidebar-link-type'

type AdditionalLinks = {
  title: string
  links: SidebarLinkType[]
}

const defaultLinks: SidebarLinkType[] = [
  { href: '/dashboard', title: 'Home', icon: HomeIcon },
  { href: '/account', title: 'Account', icon: Cog },
]

const additionalLinks: AdditionalLinks[] = []

export { additionalLinks, defaultLinks }
