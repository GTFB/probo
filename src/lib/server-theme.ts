import { cookies } from 'next/headers'
import { AppState } from './client-cookies'

// Получить тему из куки на сервере
export function getServerTheme(): 'light' | 'dark' {
  try {
    const cookieStore = cookies()
    const appStateCookie = cookieStore.get('app-state')
    
    if (!appStateCookie?.value) {
      // Если куки пустые, возвращаем светлую тему по умолчанию
      // Middleware должен был установить правильную тему
      return 'light'
    }
    
    const appState: AppState = JSON.parse(appStateCookie.value)
    return appState.theme || 'light'
  } catch (error) {
    console.error('Error parsing theme from server cookies:', error)
    return 'light'
  }
}

// Определить, нужно ли применять dark класс
export function shouldApplyDarkClass(theme: 'light' | 'dark'): boolean {
  return theme === 'dark'
}

// Получить классы для HTML элемента
export function getThemeClasses(theme: 'light' | 'dark'): string {
  const shouldDark = shouldApplyDarkClass(theme)
  return shouldDark ? 'dark' : ''
}

// Получить атрибуты для HTML элемента
export function getThemeAttributes(theme: 'light' | 'dark') {
  return {
    'data-theme': theme,
    'data-color-scheme': theme
  }
}

// Получить состояние правого сайдбара с сервера
export function getServerRightSidebarState(): boolean {
  try {
    const cookieStore = cookies()
    const appStateCookie = cookieStore.get('app-state')
    
    if (!appStateCookie?.value) {
      return true // По умолчанию открыт
    }
    
    const appState: AppState = JSON.parse(appStateCookie.value)
    return appState.rightSidebarOpen !== undefined ? appState.rightSidebarOpen : true
  } catch (error) {
    console.error('Error parsing right sidebar state from server cookies:', error)
    return true // По умолчанию открыт
  }
}

// Получить состояние левого сайдбара с сервера
export function getServerLeftSidebarState(): boolean {
  try {
    const cookieStore = cookies()
    const appStateCookie = cookieStore.get('app-state')
    
    if (!appStateCookie?.value) {
      return true // По умолчанию открыт
    }
    
    const appState: AppState = JSON.parse(appStateCookie.value)
    return appState.leftSidebarOpen !== undefined ? appState.leftSidebarOpen : true
  } catch (error) {
    console.error('Error parsing left sidebar state from server cookies:', error)
    return true // По умолчанию открыт
  }
}

// Получить CSS классы для состояния правого сайдбара
export function getRightSidebarClasses(rightSidebarOpen: boolean): string {
  return rightSidebarOpen ? 'right-sidebar-open' : 'right-sidebar-closed'
}

// Получить CSS классы для состояния левого сайдбара
export function getLeftSidebarClasses(leftSidebarOpen: boolean): string {
  return leftSidebarOpen ? 'left-sidebar-open' : 'left-sidebar-closed'
}

// Получить все CSS классы для сайдбаров
export function getAllSidebarClasses(leftSidebarOpen: boolean, rightSidebarOpen: boolean): string {
  return `${getLeftSidebarClasses(leftSidebarOpen)} ${getRightSidebarClasses(rightSidebarOpen)}`
}
