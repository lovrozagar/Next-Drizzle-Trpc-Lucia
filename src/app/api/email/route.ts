import { NextResponse } from 'next/server'

import { EmailTemplate } from '@/components/emails/email-template'
import { resend } from '@/lib/email/index'
import { emailSchema } from '@/lib/email/utils'

async function POST(request: Request) {
  const body = await request.json()
  const { name, email } = emailSchema.parse(body)

  try {
    const data = await resend.emails.send({
      from: 'Kirimase <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello world!',
      // eslint-disable-next-line new-cap
      react: EmailTemplate({ firstName: name }),
      text: 'Email powered by Resend.',
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}

export { POST }
