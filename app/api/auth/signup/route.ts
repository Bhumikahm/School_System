import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';
import { sendOTPEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let connection: any = null;
  
  try {
    console.log('=== SIGNUP REQUEST START ===');
    console.log('Env DB_HOST:', process.env.DB_HOST);
    console.log('Env DB_USER:', process.env.DB_USER);
    console.log('Env DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'undefined');
    console.log('Env DB_NAME:', process.env.DB_NAME);
    
    // Parse JSON request
    const body = await req.json();
    console.log('✓ JSON parsed');
    
    // Basic validation
    const { username, fullName, email, contact, password } = body;
    if (!username || !fullName || !email || !contact || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    console.log('✓ All fields present');
    
    // Database connection using connection pool
    connection = await getConnection();
    console.log('✓ Database connected');
    
    // Check if user exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    console.log('✓ User check complete, found:', existingUsers.length);
    
    if (existingUsers.length > 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('✓ Password hashed');
    
    // Insert user
    const [result] = await connection.execute(
      'INSERT INTO users (username, full_name, email, contact, password) VALUES (?, ?, ?, ?, ?)',
      [username, fullName, email, contact, hashedPassword]
    );
    console.log('✓ User inserted');
    
    // Generate and store OTP using secure random
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    await connection.execute(
      'INSERT INTO otps (user_id, otp_code, expires_at) VALUES (?, ?, ?)',
      [result.insertId, otp, expiresAt]
    );
    console.log('✓ OTP stored');
    
    // Send OTP email
    await sendOTPEmail(email, otp);
    console.log('✓ OTP email sent');
    
    console.log('=== SIGNUP SUCCESS ===');
    return NextResponse.json({ message: 'OTP sent to email' });
    
  } catch (error: any) {
    console.error('=== SIGNUP ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('==================');
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}