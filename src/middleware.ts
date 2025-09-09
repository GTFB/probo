import { NextRequest, NextResponse } from 'next/server'
import { getStateFromRequest, setStateToResponse } from '@/lib/cookies'
import { migrateAppState } from '@/lib/client-cookies'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  try {
    // Получаем текущее состояние из куки
    const currentState = getStateFromRequest(request)
    const migratedState = migrateAppState(currentState)
    
    // Определяем системную тему по заголовку
    const prefersColorScheme = request.headers.get('sec-ch-prefers-color-scheme') || 
                              request.headers.get('prefers-color-scheme')
    
    // Если тема не установлена, используем системную
    let theme = migratedState.theme
    if (!theme && prefersColorScheme) {
      theme = prefersColorScheme === 'dark' ? 'dark' : 'light'
    }
    
    // Обновляем состояние
    const updatedState = {
      ...migratedState,
      theme: theme || 'light',
      lastVisitedPage: request.nextUrl.pathname
    }    
    // Сохраняем обновленное состояние в куки
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
