import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getConnection } from '@/lib/database';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let connection: any = null;
  
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email = formData.get('email') as string;
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ message: 'Image is required' }, { status: 400 });
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json({ message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' }, { status: 400 });
    }
    
    if (image.size > 5 * 1024 * 1024) { // 5MB limit
      return NextResponse.json({ message: 'File too large. Maximum size is 5MB' }, { status: 400 });
    }

    // Sanitize filename
    const sanitizedName = image.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const imageName = `${Date.now()}-${sanitizedName}`;
    const imagePath = path.join(process.cwd(), 'public', 'schoolImages', imageName);
    
    // Validate path to prevent traversal
    const publicDir = path.join(process.cwd(), 'public', 'schoolImages');
    if (!imagePath.startsWith(publicDir)) {
      return NextResponse.json({ message: 'Invalid file path' }, { status: 400 });
    }
    
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(imagePath, buffer);

    connection = await getConnection();
    
    await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageName, email]
    );

    return NextResponse.json({ message: 'School added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Add school error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function GET(req: NextRequest) {
  let connection: any = null;
  
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    connection = await getConnection();
    
    const [rows]: any = await connection.execute('SELECT * FROM schools ORDER BY id DESC');

    return NextResponse.json({ schools: rows });
  } catch (error) {
    console.error('Fetch schools error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}