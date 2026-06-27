import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Protect all routes starting with /admin/dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const session = request.cookies.get('admin_session')?.value;
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    try {
      // Verify token
      const parsed = await decrypt(session);
      if (!parsed || parsed.user !== (process.env.ADMIN_USERNAME || 'admin')) {
        throw new Error('Invalid session');
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
