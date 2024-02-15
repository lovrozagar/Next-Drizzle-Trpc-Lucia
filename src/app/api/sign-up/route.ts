/* eslint-disable max-statements */
/* eslint-disable sonar/no-wildcard-import */
/* eslint-disable import/no-namespace */
import { LuciaError } from 'lucia'
import * as context from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth/lucia'

const MINIMUM_USERNAME_LENGTH = 4
const MAXIMUM_USERNAME_LENGTH = 31

const MINIMUM_PASSWORD_LENGTH = 6
const MAXIMUM_PASSWORD_LENGTH = 255

const POST = async (request: NextRequest) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  // basic check
  if (
    typeof username !== 'string' ||
    username.length < MINIMUM_USERNAME_LENGTH ||
    username.length > MAXIMUM_USERNAME_LENGTH
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
    password.length < MINIMUM_PASSWORD_LENGTH ||
    password.length > MAXIMUM_PASSWORD_LENGTH
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
    const user = await auth.createUser({
      key: {
        providerId: 'username', // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username,
        name: '',
        email: '',
      },
    })

    console.log('try block')

    const session = await auth.createSession({
      userId: user.userId,
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
    // this part depends on the database you're using
    // check for unique constraint error in user table
    console.log(error)

    if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
      return NextResponse.json(
        {
          error: 'Username already taken',
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
