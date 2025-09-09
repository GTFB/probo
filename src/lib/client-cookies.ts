// Client utilities for working with cookies
export interface AppState {
  theme?: 'light' | 'dark' | 'system'
  sidebarOpen?: boolean
  sidebarCollapsed?: boolean
  lastVisitedPage?: string
  userPreferences?: {
    language?: string
    timezone?: string
    notifications?: boolean
  }
  customData?: Record<string, any>
}

// Cookie configuration
const COOKIE_CONFIG = {
  name: 'app-state',
  maxAge: 60 * 60 * 24 * 30, // 30 days
  httpOnly: false, // Available for client
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
}

// Client utilities for working with cookies
export class ClientCookieManager {
  // Get state from cookies
  getState(): AppState {
    if (typeof window === 'undefined') return {}
    
    try {
      const cookieValue = this.getCookie(COOKIE_CONFIG.name)
      if (!cookieValue) return {}
      
      // Additional validation for JSON string
      if (typeof cookieValue !== 'string' || cookieValue.trim() === '') {
        return {}
      }
      
      const parsed = JSON.parse(cookieValue)
      
      // Validate that parsed value is an object
      if (typeof parsed !== 'object' || parsed === null) {
        console.warn('Invalid app state format in cookie, clearing...')
        this.clearState()
        return {}
      }
      
      return parsed as AppState
    } catch (error) {
      console.error('Error parsing app state from cookies:', error)
      // Clear invalid cookie
      this.clearState()
      return {}
    }
  }

  // Save state to cookies
  setState(state: AppState): void {
    if (typeof window === 'undefined') return
    
    try {
      const stateString = JSON.stringify(state)
      this.setCookie(COOKIE_CONFIG.name, stateString, COOKIE_CONFIG.maxAge)
    } catch (error) {
      console.error('Error setting app state to cookies:', error)
    }
  }

  // Update part of state
  updateState(updates: Partial<AppState>): AppState {
    const currentState = this.getState()
    const newState = { ...currentState, ...updates }
    this.setState(newState)
    return newState
  }

  // Remove state
  clearState(): void {
    if (typeof window === 'undefined') return
    this.setCookie(COOKIE_CONFIG.name, '', -1)
  }

  // Get specific value
  getValue<K extends keyof AppState>(key: K): AppState[K] | undefined {
    const state = this.getState()
    return state[key]
  }

  // Set specific value
  setValue<K extends keyof AppState>(key: K, value: AppState[K]): void {
    this.updateState({ [key]: value } as Partial<AppState>)
  }

  // Helper methods for working with cookies
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() || null
      if (cookieValue) {
        try {
          // Decode URL-encoded values
          return decodeURIComponent(cookieValue)
        } catch (error) {
          console.error('Error decoding cookie value:', error)
          return cookieValue
        }
      }
      return null
    }
    return null
  }

  private setCookie(name: string, value: string, maxAge: number): void {
    const expires = maxAge === -1 
      ? 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
      : `expires=${new Date(Date.now() + maxAge * 1000).toUTCString()}`
    
    try {
      // Encode the value to prevent issues with special characters
      const encodedValue = encodeURIComponent(value)
      document.cookie = `${name}=${encodedValue}; ${expires}; path=${COOKIE_CONFIG.path}; ${COOKIE_CONFIG.secure ? 'secure; ' : ''}samesite=${COOKIE_CONFIG.sameSite}`
    } catch (error) {
      console.error('Error setting cookie:', error)
    }
  }
}

// Hook for use on client
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

// State validation utilities
export function validateAppState(state: any): state is AppState {
  if (typeof state !== 'object' || state === null) return false
  
  // Check main fields
  if (state.theme && !['light', 'dark', 'system'].includes(state.theme)) return false
  if (state.sidebarOpen && typeof state.sidebarOpen !== 'boolean') return false
  if (state.sidebarCollapsed && typeof state.sidebarCollapsed !== 'boolean') return false
  if (state.lastVisitedPage && typeof state.lastVisitedPage !== 'string') return false
  
  return true
}

// State migration utilities
export function migrateAppState(state: any): AppState {
  const defaultState: AppState = {
    theme: 'system',
    sidebarOpen: true,
    sidebarCollapsed: false,
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
