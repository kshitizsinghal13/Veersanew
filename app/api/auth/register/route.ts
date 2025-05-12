import { NextResponse } from 'next/server'
import { createUser, createSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const userId = await createUser(email, password, name, role)
    const token = await createSession(userId)

    return NextResponse.json({ success: true, token })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}