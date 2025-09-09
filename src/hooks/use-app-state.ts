"use client"

import { useState, useEffect, useCallback } from 'react'
import { AppState, useAppState as useCookieState } from '@/lib/client-cookies'

export function useAppState() {
  const cookieManager = useCookieState()
  const [state, setState] = useState<AppState>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load state on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // First try to load from cookies
        const cookieState = cookieManager.getState()
        if (Object.keys(cookieState).length > 0) {
          setState(cookieState)
        } else {
          // If no data in cookies, load from server
          try {
            const response = await fetch('/api/state')
            if (response.ok) {
              const data = await response.json()
              setState(data.state)
              // Save to cookies for quick access
              cookieManager.setState(data.state)
            }
          } catch (serverError) {
            console.warn('Failed to load from server, using default state:', serverError)
            // Use default state if server is unavailable
            setState({})
          }
        }
      } catch (err) {
        console.error('Error loading app state:', err)
        setError('Failed to load app state')
        // Clear potentially corrupted cookies
        cookieManager.clearState()
        setState({})
      } finally {
        setIsLoading(false)
      }
    }

    loadState()
  }, [])

  // Update state
  const updateState = useCallback(async (updates: Partial<AppState>) => {
    try {
      setError(null)
      const newState = { ...state, ...updates }
      
      // Update local state
      setState(newState)
      
      // Save to cookies
      cookieManager.setState(newState)
      
      // Send to server
      const response = await fetch('/api/state', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update state on server')
      }
    } catch (err) {
      console.error('Error updating app state:', err)
      setError('Failed to update app state')
    }
  }, [state, cookieManager])

  // Set specific value
  const setValue = useCallback(async <K extends keyof AppState>(
    key: K, 
    value: AppState[K]
  ) => {
    await updateState({ [key]: value } as Partial<AppState>)
  }, [updateState])

  // Get specific value
  const getValue = useCallback(<K extends keyof AppState>(key: K): AppState[K] | undefined => {
    return state[key]
  }, [state])

  // Clear state
  const clearState = useCallback(async () => {
    try {
      setError(null)
      setState({})
      cookieManager.clearState()
      
      const response = await fetch('/api/state', {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to clear state on server')
      }
    } catch (err) {
      console.error('Error clearing app state:', err)
      setError('Failed to clear app state')
    }
  }, [cookieManager])

  // Sync with server
  const syncWithServer = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch('/api/state')
      if (response.ok) {
        const data = await response.json()
        setState(data.state)
        cookieManager.setState(data.state)
      }
    } catch (err) {
      console.error('Error syncing with server:', err)
      setError('Failed to sync with server')
    }
  }, [cookieManager])

  return {
    state,
    isLoading,
    error,
    updateState,
    setValue,
    getValue,
    clearState,
    syncWithServer
  }
}

// Hook for working with specific values
export function useAppStateValue<K extends keyof AppState>(key: K) {
  const { state, setValue, getValue } = useAppState()
  
  return {
    value: getValue(key),
    setValue: (value: AppState[K]) => setValue(key, value)
  }
}

// Hook for working with theme
export function useTheme() {
  const { value: theme, setValue: setTheme } = useAppStateValue('theme')
  
  return {
    theme: theme || 'system',
    setTheme: (theme: 'light' | 'dark' | 'system') => setTheme(theme)
  }
}

// Hook for working with sidebar
export function useSidebar() {
  const { value: sidebarOpen, setValue: setSidebarOpen } = useAppStateValue('sidebarOpen')
  const { value: sidebarCollapsed, setValue: setSidebarCollapsed } = useAppStateValue('sidebarCollapsed')
  
  return {
    sidebarOpen: sidebarOpen ?? true,
    setSidebarOpen: (open: boolean) => setSidebarOpen(open),
    sidebarCollapsed: sidebarCollapsed ?? false,
    setSidebarCollapsed: (collapsed: boolean) => setSidebarCollapsed(collapsed)
  }
}

// Hook for working with user preferences
export function useUserPreferences() {
  const { value: preferences, setValue: setPreferences } = useAppStateValue('userPreferences')
  
  const updatePreference = useCallback((key: string, value: any) => {
    setPreferences({
      ...preferences,
      [key]: value
    })
  }, [preferences, setPreferences])
  
  return {
    preferences: preferences || {},
    updatePreference
  }
}
