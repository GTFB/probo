// Клиентские утилиты для работы с куки
export interface AppState {
  theme?: 'light' | 'dark'
  sidebarOpen?: boolean
  sidebarCollapsed?: boolean
  leftSidebarOpen?: boolean
  rightSidebarOpen?: boolean
  lastVisitedPage?: string
  userPreferences?: {
    language?: string
    timezone?: string
    notifications?: boolean
  }
  customData?: Record<string, any>
}

// Конфигурация куки
const COOKIE_CONFIG = {
  name: 'app-state',
  maxAge: 60 * 60 * 24 * 30, // 30 дней
  httpOnly: false, // Доступно для клиента
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
}

// Клиентские утилиты для работы с куки
export class ClientCookieManager {
  // Получить состояние из куки
  getState(): AppState {
    if (typeof window === 'undefined') return {}
    
    try {
      const cookieValue = this.getCookie(COOKIE_CONFIG.name)
      if (!cookieValue) return {}
      
      return JSON.parse(cookieValue) as AppState
    } catch (error) {
      console.error('Error parsing app state from cookies:', error)
      return {}
    }
  }

  // Сохранить состояние в куки
  setState(state: AppState): void {
    if (typeof window === 'undefined') return
    
    try {
      const stateString = JSON.stringify(state)
      this.setCookie(COOKIE_CONFIG.name, stateString, COOKIE_CONFIG.maxAge)
    } catch (error) {
      console.error('Error setting app state to cookies:', error)
    }
  }

  // Обновить часть состояния
  updateState(updates: Partial<AppState>): AppState {
    const currentState = this.getState()
    const newState = { ...currentState, ...updates }
    this.setState(newState)
    return newState
  }

  // Удалить состояние
  clearState(): void {
    if (typeof window === 'undefined') return
    this.setCookie(COOKIE_CONFIG.name, '', -1)
  }

  // Получить конкретное значение
  getValue<K extends keyof AppState>(key: K): AppState[K] | undefined {
    const state = this.getState()
    return state[key]
  }

  // Установить конкретное значение
  setValue<K extends keyof AppState>(key: K, value: AppState[K]): void {
    this.updateState({ [key]: value } as Partial<AppState>)
  }

  // Вспомогательные методы для работы с куки
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null
    }
    return null
  }

  private setCookie(name: string, value: string, maxAge: number): void {
    const expires = maxAge === -1 
      ? 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
      : `expires=${new Date(Date.now() + maxAge * 1000).toUTCString()}`
    
    document.cookie = `${name}=${value}; ${expires}; path=${COOKIE_CONFIG.path}; ${COOKIE_CONFIG.secure ? 'secure; ' : ''}samesite=${COOKIE_CONFIG.sameSite}`
  }
}

// Хук для использования на клиенте
export function useAppState() {
  const cookieManager = new ClientCookieManager()
  
  return {
    getState: () => cookieManager.getState(),
    setState: (state: AppState) => cookieManager.setState(state),
    updateState: (updates: Partial<AppState>) => cookieManager.updateState(updates),
    clearState: () => cookieManager.clearState(),
    getValue: <K extends keyof AppState>(key: K) => cookieManager.getValue(key),
    setValue: <K extends keyof AppState>(key: K, value: AppState[K]) => cookieManager.setValue(key, value)
  }
}

// Утилиты для валидации состояния
export function validateAppState(state: any): state is AppState {
  if (typeof state !== 'object' || state === null) return false
  
  // Проверяем основные поля
  if (state.theme && !['light', 'dark'].includes(state.theme)) return false
  if (state.sidebarOpen && typeof state.sidebarOpen !== 'boolean') return false
  if (state.sidebarCollapsed && typeof state.sidebarCollapsed !== 'boolean') return false
  if (state.lastVisitedPage && typeof state.lastVisitedPage !== 'string') return false
  
  return true
}

// Утилиты для миграции состояния
export function migrateAppState(state: any): AppState {
  const defaultState: AppState = {
    theme: 'light',
    sidebarOpen: true,
    sidebarCollapsed: false,
    leftSidebarOpen: true,
    rightSidebarOpen: true,
    lastVisitedPage: '/',
    userPreferences: {
      language: 'ru',
      timezone: 'Europe/Moscow',
      notifications: true
    },
    customData: {}
  }

  if (!validateAppState(state)) {
    return defaultState
  }

  return {
    ...defaultState,
    ...state,
    userPreferences: {
      ...defaultState.userPreferences,
      ...state.userPreferences
    }
  }
}
