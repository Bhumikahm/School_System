import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  let connection: any = null;
  
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    connection = await getConnection();
    
    const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM users');
    const [schoolCount] = await connection.execute('SELECT COUNT(*) as count FROM schools');
    
    return NextResponse.json({
      users: userCount[0].count,
      schools: schoolCount[0].count,
      active: userCount[0].count > 0 ? 100 : 0
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}