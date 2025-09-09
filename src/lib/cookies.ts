import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { AppState } from './client-cookies'

// Конфигурация куки
const COOKIE_CONFIG = {
  name: 'app-state',
  maxAge: 60 * 60 * 24 * 30, // 30 дней
  httpOnly: false, // Доступно для клиента
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
}

// Серверные утилиты для работы с куки
export class ServerCookieManager {
  private cookieStore: ReturnType<typeof cookies>

  constructor() {
    this.cookieStore = cookies()
  }

  // Получить состояние из куки
  getState(): AppState {
    try {
      const cookieValue = this.cookieStore.get(COOKIE_CONFIG.name)?.value
      if (!cookieValue) return {}
      
      return JSON.parse(cookieValue) as AppState
    } catch (error) {
      console.error('Error parsing app state from cookies:', error)
      return {}
    }
  }

  // Сохранить состояние в куки
  setState(state: AppState): void {
    try {
      const stateString = JSON.stringify(state)
      this.cookieStore.set(COOKIE_CONFIG.name, stateString, COOKIE_CONFIG)
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
    this.cookieStore.delete(COOKIE_CONFIG.name)
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
}


// Утилиты для middleware
export function getStateFromRequest(request: NextRequest): AppState {
  try {
    const cookieValue = request.cookies.get(COOKIE_CONFIG.name)?.value
    if (!cookieValue) return {}
    
    return JSON.parse(cookieValue) as AppState
  } catch (error) {
    console.error('Error parsing app state from request cookies:', error)
    return {}
  }
}

export function setStateToResponse(response: NextResponse, state: AppState): NextResponse {
  try {
    const stateString = JSON.stringify(state)
    response.cookies.set(COOKIE_CONFIG.name, stateString, COOKIE_CONFIG)
    return response
  } catch (error) {
    console.error('Error setting app state to response cookies:', error)
    return response
  }
}

// Импортируем утилиты из клиентского файла
export { validateAppState, migrateAppState } from './client-cookies'
