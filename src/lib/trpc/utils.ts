function getBaseUrl() {
  if (typeof window !== 'undefined') return ''

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  return 'http://localhost:3000'
}

function getUrl() {
  return `${getBaseUrl()}/api/trpc`
}

export { getBaseUrl, getUrl }
