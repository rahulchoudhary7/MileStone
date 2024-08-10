import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { redirect } from 'next/dist/server/api-utils'
import { NextResponse } from 'next/server'

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect()

  if (auth().userId && isPublicRoute(req)) {
    let path = '/select-org'

    if (auth().orgId) {
      path = `/organization/${auth().orgId}`
    }

    const orgSelection = new URL(path, req.url)

    return NextResponse.redirect(orgSelection)
  }

  if(auth().userId && !auth().orgId && req.nextUrl.pathname!=='/select-org'){
    const orgSelection = new URL('/select-org', req.url)

    return NextResponse.redirect(orgSelection)
  }

 
})

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
