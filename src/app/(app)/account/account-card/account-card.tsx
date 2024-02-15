type AccountCardProps = Readonly<{
  params: {
    header: string
    description: string
    price?: number
  }
  children: React.ReactNode
}>

function AccountCard({ params, children }: AccountCardProps) {
  const { header, description } = params

  return (
    <div className='rounded-lg border border-neutral-200 bg-white'>
      <div id='body' className='p-4 '>
        <h3 className='text-xl font-semibold'>{header}</h3>
        <p className='text-neutral-500'>{description}</p>
      </div>
      {children}
    </div>
  )
}

export { AccountCard }
