import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { AppState } from './client-cookies'

// Cookie configuration
const COOKIE_CONFIG = {
  name: 'app-state',
  maxAge: 60 * 60 * 24 * 30, // 30 days
  httpOnly: false, // Available for client
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
}

// Server utilities for working with cookies
export class ServerCookieManager {
  private cookieStore: ReturnType<typeof cookies>

  constructor() {
    this.cookieStore = cookies()
  }

  // Get state from cookies
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

  // Save state to cookies
  setState(state: AppState): void {
    try {
      const stateString = JSON.stringify(state)
      this.cookieStore.set(COOKIE_CONFIG.name, stateString, COOKIE_CONFIG)
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
    this.cookieStore.delete(COOKIE_CONFIG.name)
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
}


// Middleware utilities
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

// Import utilities from client file
export { validateAppState, migrateAppState } from './client-cookies'
