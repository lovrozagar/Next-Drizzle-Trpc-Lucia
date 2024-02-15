import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789')

function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`
}

export { absoluteUrl, nanoid }
