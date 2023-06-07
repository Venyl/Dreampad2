import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const isLoggedIn = req.cookies.get('pb_auth')?.value;
    const url = req.nextUrl.clone();
    const goodUrls = ['/', '/new'];

    if (!isLoggedIn && goodUrls.includes(url.pathname)) {
        console.log('url', url);
        return NextResponse.redirect(url.origin + '/login');
    }
}
