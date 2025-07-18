import { NextResponse } from "next/server";
 
let locales = ['en-US', 'nl-NL', 'nl-BE' ,  'nl']
 
// Get the preferred locale, similar to the above or using a library
function getLocale(request) { 
    const { nextUrl } = request
    const { locale } = nextUrl
    // Check if the locale is supported, otherwise fallback to the default
    if (locales.includes(locale)) return locale
    return locales[0] // Default to the first locale in the list
 }
 
export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  console.log('Middleware pathname:', pathname)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
}