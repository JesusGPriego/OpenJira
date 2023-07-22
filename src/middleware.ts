import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/entries/')) {
    const id = request.nextUrl.pathname.replace('/api/entries/', '');
    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    if (!checkMongoIDRegExp.test(id)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `${id} is not a valid MongoID`,
        }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/api/:path',
    '/api/entries/:path*',
  ],
};
