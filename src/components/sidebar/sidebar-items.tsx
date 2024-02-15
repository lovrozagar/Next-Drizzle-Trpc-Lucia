'use client'

import SidebarLinkGroup from '@/components/sidebar/sidebar-link-group'
import { additionalLinks, defaultLinks } from '@/config/nav'

const SidebarItems = () => (
  <>
    <SidebarLinkGroup links={defaultLinks} />
    {additionalLinks.length > 0
      ? additionalLinks.map((link) => (
          <SidebarLinkGroup links={link.links} title={link.title} border key={link.title} />
        ))
      : null}
  </>
)

export default SidebarItems
