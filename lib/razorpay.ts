import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
})

export async function createPaymentOrder(amount: number) {
  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1
  }

  try {
    const order = await razorpay.orders.create(options)
    return order
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

export async function verifyPayment(orderId: string, paymentId: string, signature: string) {
  const text = orderId + '|' + paymentId
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(text)
    .digest('hex')

  return generated_signature === signature
}