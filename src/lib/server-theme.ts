import { cookies } from 'next/headers'
import { AppState } from './client-cookies'

// Get theme from cookies on server
export function getServerTheme(): 'light' | 'dark' {
  try {
    const cookieStore = cookies()
    const appStateCookie = cookieStore.get('app-state')
    
    if (!appStateCookie?.value) {
      // If cookies are empty, return light theme by default
      // Middleware should have set the correct theme
      return 'light'
    }
    
    const appState: AppState = JSON.parse(appStateCookie.value)
    return appState.theme || 'light'
  } catch (error) {
    console.error('Error parsing theme from server cookies:', error)
    return 'light'
  }
}

// Determine if dark class should be applied
export function shouldApplyDarkClass(theme: 'light' | 'dark'): boolean {
  return theme === 'dark'
}

// Get classes for HTML element
export function getThemeClasses(theme: 'light' | 'dark'): string {
  const shouldDark = shouldApplyDarkClass(theme)
  return shouldDark ? 'dark' : ''
}

// Get attributes for HTML element
export function getThemeAttributes(theme: 'light' | 'dark') {
  return {
    'data-theme': theme,
    'data-color-scheme': theme
  }
}
