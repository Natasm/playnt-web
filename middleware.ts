import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  if (url.pathname === '/') {
    url.pathname = '/home'
    return NextResponse.redirect(url)   
  } 
}