import { Action } from '@/components/auth/form-types'

const SubmitButton = ({
  action,
  loading,
}: Readonly<{
  action: Action
  loading: boolean
}>) => {
  const getButtonSuffix = () => {
    switch (action) {
      case '/api/sign-in':
        return 'in'
      case '/api/sign-out':
        return 'out'
      case '/api/sign-up':
        return 'up'

      default:
        return ''
    }
  }

  return (
    <button
      type='submit'
      className={`rounded-md p-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${
        action === '/api/sign-out' ? 'bg-red-500' : 'w-full bg-neutral-900'
      }`}
      disabled={loading}
    >
      Sign{loading ? 'ing' : ''} {getButtonSuffix()}
    </button>
  )
}

export { SubmitButton }
