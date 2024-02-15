/* eslint-disable sonar/no-wildcard-import */
/* eslint-disable max-statements */
/* eslint-disable import/no-namespace */
import { LuciaError } from 'lucia'
import * as context from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth/lucia'

const MAXIUMUM_USERNAME_LENGTH = 31
const MAXIUMUM_PASSWORD_LENGTH = 255

const POST = async (request: NextRequest) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  // basic check
  if (
    typeof username !== 'string' ||
    username.length === 0 ||
    username.length > MAXIUMUM_USERNAME_LENGTH
  ) {
    return NextResponse.json(
      {
        error: 'Invalid username',
      },
      {
        status: 400,
      },
    )
  }

  if (
    typeof password !== 'string' ||
    password.length === 0 ||
    password.length > MAXIUMUM_PASSWORD_LENGTH
  ) {
    return NextResponse.json(
      {
        error: 'Invalid password',
      },
      {
        status: 400,
      },
    )
  }

  try {
    // find user by key
    // and validate password
    const key = await auth.useKey('username', username.toLowerCase(), password)
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest(request.method, context)

    authRequest.setSession(session)

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard', // redirect to profile page
      },
    })
  } catch (error) {
    if (
      error instanceof LuciaError &&
      (error.message === 'AUTH_INVALID_KEY_ID' || error.message === 'AUTH_INVALID_PASSWORD')
    ) {
      // user does not exist or invalid password
      return NextResponse.json(
        {
          error: 'Incorrect username or password',
        },
        {
          status: 400,
        },
      )
    }

    return NextResponse.json(
      {
        error: 'An unknown error occurred',
      },
      {
        status: 500,
      },
    )
  }
}

export { POST }
