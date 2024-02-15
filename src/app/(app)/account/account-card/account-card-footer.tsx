function AccountCardFooter({
  description,
  children,
}: Readonly<{
  children: React.ReactNode
  description: string
}>) {
  return (
    <div
      className='flex items-center justify-between rounded-b-lg border border-neutral-200 bg-neutral-50 p-4'
      id='footer'
    >
      <p className='text-sm text-neutral-500'>{description}</p>
      {children}
    </div>
  )
}

export { AccountCardFooter }
