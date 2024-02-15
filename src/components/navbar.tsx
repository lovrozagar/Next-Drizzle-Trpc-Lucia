'use client'

import { AlignRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { defaultLinks } from '@/config/nav'

function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className='mb-4 w-full border-b pb-2 md:hidden'>
      <nav className='flex w-full items-center justify-between'>
        <div className='text-lg font-semibold'>Logo</div>
        <button type='button' onClick={() => setOpen(!open)}>
          <AlignRight />
        </button>
      </nav>
      {open ? (
        <div className='my-4 bg-muted p-4'>
          <ul className='space-y-2'>
            {defaultLinks.map((link) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <li key={link.title} onClick={() => setOpen(false)} className=''>
                <Link
                  href={link.href}
                  className={
                    pathname === link.href
                      ? 'font-semibold text-primary hover:text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export { Navbar }
