import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let connection: any = null;
  
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    connection = await getConnection();
    
    const [rows]: any = await connection.execute(`
      SELECT u.id, o.otp_code, o.expires_at 
      FROM users u 
      JOIN otps o ON u.id = o.user_id 
      WHERE u.email = ? 
      ORDER BY o.id DESC 
      LIMIT 1
    `, [email]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const { id: userId, otp_code, expires_at } = rows[0];

    if (otp_code !== otp || new Date() > new Date(expires_at)) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    await connection.execute(
      'UPDATE users SET is_verified = TRUE WHERE id = ?',
      [userId]
    );

    await connection.execute(
      'DELETE FROM otps WHERE user_id = ?',
      [userId]
    );

    return NextResponse.json({ message: 'Account verified successfully' }, { status: 200 });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}