import { NextRequest, NextResponse } from 'next/server'
import { getStateFromRequest, setStateToResponse } from '@/lib/cookies'
import { migrateAppState } from '@/lib/client-cookies'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  try {
    // Get current state from cookies
    const currentState = getStateFromRequest(request)
    const migratedState = migrateAppState(currentState)
    
    // Get locale from app state cookies or use default
    const appStateCookie = request.cookies.get('app-state')?.value
    let locale = 'en' // default
    
    if (appStateCookie) {
      try {
        const appState = JSON.parse(appStateCookie)
        const supportedLocales = ['en', 'ru', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'hi']
        if (appState.locale && supportedLocales.includes(appState.locale)) {
          locale = appState.locale
        }
      } catch (error) {
        console.warn('Failed to parse app state cookie:', error)
      }
    }
    
    // Determine system theme by header
    const prefersColorScheme = request.headers.get('sec-ch-prefers-color-scheme') || 
                              request.headers.get('prefers-color-scheme')
    
    // If theme is not set, use system theme
    let theme = migratedState.theme
    if (!theme && prefersColorScheme) {
      theme = prefersColorScheme === 'dark' ? 'dark' : 'light'
    }
    
    // Update state
    const updatedState = {
      ...migratedState,
      theme: theme || 'light',
      locale: locale,
      lastVisitedPage: request.nextUrl.pathname
    }    
    
    // Save updated state to cookies
    return setStateToResponse(response, updatedState)
  } catch (error) {
    console.error('Error in middleware:', error)
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
