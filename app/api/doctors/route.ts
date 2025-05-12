import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const db = await getDb()
    const doctors = await db.all(`
      SELECT 
        u.id,
        u.name,
        dp.specialty,
        dp.experience,
        dp.consultation_fee
      FROM users u
      JOIN doctor_profiles dp ON u.id = dp.user_id
      WHERE u.role = 'doctor'
    `)

    return NextResponse.json({ doctors })
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}