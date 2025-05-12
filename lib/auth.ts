import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { getDb } from './db'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createUser(email: string, password: string, name: string, role: 'patient' | 'doctor') {
  const db = await getDb()
  const hashedPassword = await hashPassword(password)
  const id = crypto.randomUUID()

  await db.run(
    'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)',
    [id, email, hashedPassword, name, role]
  )

  return id
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET)

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400 // 24 hours
  })

  return token
}

export async function validateSession() {
  const session = cookies().get('session')

  if (!session) {
    return null
  }

  try {
    const { payload } = await jwtVerify(session.value, JWT_SECRET)
    return payload.userId as string
  } catch {
    return null
  }
}

export async function getUserById(id: string) {
  const db = await getDb()
  return await db.get('SELECT * FROM users WHERE id = ?', [id])
}

export async function getUserByEmail(email: string) {
  const db = await getDb()
  return await db.get('SELECT * FROM users WHERE email = ?', [email])
}