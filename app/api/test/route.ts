import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    console.log('Test API called');
    const body = await req.json();
    console.log('Body received:', body);
    return NextResponse.json({ message: 'Test successful', received: body });
  } catch (error: any) {
    console.error('Test API error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}