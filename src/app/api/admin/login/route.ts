import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';

// In production, these should be securely stored in Environment Variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vedadmin123';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create session
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await encrypt({ user: username, expires });

      const response = NextResponse.json({ success: true }, { status: 200 });
      response.cookies.set({
        name: 'admin_session',
        value: session,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expires,
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
