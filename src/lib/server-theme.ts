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

// Get right sidebar state from server
export function getServerRightSidebarState(): 'open' | 'close' {
  try {
    const cookieStore = cookies()
    const appStateCookie = cookieStore.get('app-state')
    
    if (!appStateCookie?.value) {
      return 'open' // Open by default
    }
    
    const appState: AppState = JSON.parse(appStateCookie.value)
    return appState.rightSidebarState === 'close' ? 'close' : 'open'
  } catch (error) {
    console.error('Error parsing right sidebar state from server cookies:', error)
    return 'open' // Open by default
  }
}

// Get left sidebar state from server
export function getServerLeftSidebarState(): 'open' | 'close' {
  try {
    const cookieStore = cookies()
    const appStateCookie = cookieStore.get('app-state')
    
    if (!appStateCookie?.value) {
      return 'open' // Open by default
    }
    
    const appState: AppState = JSON.parse(appStateCookie.value)
    return appState.leftSidebarState === 'close' ? 'close' : 'open'
  } catch (error) {
    console.error('Error parsing left sidebar state from server cookies:', error)
    return 'open' // Open by default
  }
}

// Get CSS classes for right sidebar state
export function getRightSidebarClasses(rightSidebarState: boolean): string {
  return rightSidebarState ? 'right-sidebar-open' : 'right-sidebar-closed'
}

// Get CSS classes for left sidebar state
export function getLeftSidebarClasses(leftSidebarState: boolean): string {
  return leftSidebarState ? 'left-sidebar-open' : 'left-sidebar-closed'
}

// Get all CSS classes for sidebars
export function getAllSidebarClasses(leftSidebarState: boolean, rightSidebarState: boolean): string {
  return `${getLeftSidebarClasses(leftSidebarState)} ${getRightSidebarClasses(rightSidebarState)}`
}
