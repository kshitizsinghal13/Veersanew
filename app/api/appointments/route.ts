import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'
import { getDb } from '@/lib/db'
import { createPaymentOrder } from '@/lib/razorpay'

export async function POST(request: Request) {
  try {
    const userId = await validateSession()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { doctorId, date, amount } = await request.json()

    if (!doctorId || !date || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const order = await createPaymentOrder(amount)
    const db = await getDb()
    
    const appointmentId = crypto.randomUUID()
    await db.run(
      `INSERT INTO appointments (
        id, patient_id, doctor_id, date, status, 
        payment_status, amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        appointmentId,
        userId,
        doctorId,
        date,
        'scheduled',
        'pending',
        amount
      ]
    )

    return NextResponse.json({
      success: true,
      appointmentId,
      order
    })
  } catch (error) {
    console.error('Appointment creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const userId = await validateSession()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await getDb()
    const appointments = await db.all(
      `SELECT 
        a.*,
        u.name as doctor_name,
        dp.specialty as doctor_specialty
      FROM appointments a
      JOIN users u ON a.doctor_id = u.id
      JOIN doctor_profiles dp ON u.id = dp.user_id
      WHERE a.patient_id = ?
      ORDER BY a.date DESC`,
      [userId]
    )

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Appointments fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}