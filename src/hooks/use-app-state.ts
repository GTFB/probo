"use client"

import { useState, useEffect, useCallback } from 'react'
import { AppState, useAppState as useCookieState } from '@/lib/client-cookies'

export function useAppState() {
  const cookieManager = useCookieState()
  const [state, setState] = useState<AppState>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузить состояние при монтировании
  useEffect(() => {
    const loadState = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Сначала пытаемся загрузить из куки
        const cookieState = cookieManager.getState()
        if (Object.keys(cookieState).length > 0) {
          setState(cookieState)
        } else {
          // Если в куки нет данных, загружаем с сервера
          const response = await fetch('/api/state')
          if (response.ok) {
            const data = await response.json()
            setState(data.state)
            // Сохраняем в куки для быстрого доступа
            cookieManager.setState(data.state)
          }
        }
      } catch (err) {
        console.error('Error loading app state:', err)
        setError('Failed to load app state')
      } finally {
        setIsLoading(false)
      }
    }

    loadState()
  }, [])

  // Обновить состояние
  const updateState = useCallback(async (updates: Partial<AppState>) => {
    try {
      setError(null)
      const newState = { ...state, ...updates }
      
      // Обновляем локальное состояние
      setState(newState)
      
      // Сохраняем в куки
      cookieManager.setState(newState)
      
      // Отправляем на сервер
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

  // Установить конкретное значение
  const setValue = useCallback(async <K extends keyof AppState>(
    key: K, 
    value: AppState[K]
  ) => {
    await updateState({ [key]: value } as Partial<AppState>)
  }, [updateState])

  // Получить конкретное значение
  const getValue = useCallback(<K extends keyof AppState>(key: K): AppState[K] | undefined => {
    return state[key]
  }, [state])

  // Очистить состояние
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

  // Синхронизировать с сервером
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

// Хук для работы с конкретными значениями
export function useAppStateValue<K extends keyof AppState>(key: K) {
  const { state, setValue, getValue } = useAppState()
  
  return {
    value: getValue(key),
    setValue: (value: AppState[K]) => setValue(key, value)
  }
}

// Хук для работы с темой
export function useTheme() {
  const { value: theme, setValue: setTheme } = useAppStateValue('theme')
  
  return {
    theme: theme || 'light',
    setTheme: (theme: 'light' | 'dark') => setTheme(theme)
  }
}

// Хук для работы с сайдбаром
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

// Хук для работы с пользовательскими настройками
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

// Хук для управления левым сайдбаром
export function useLeftSidebar() {
  const { state, updateState } = useAppState()
  
  return {
    open: state.leftSidebarOpen !== undefined ? state.leftSidebarOpen : true,
    updateOpen: (open: boolean) => updateState({ leftSidebarOpen: open })
  }
}

// Хук для управления правым сайдбаром
export function useRightSidebar() {
  const { state, updateState } = useAppState()
  
  return {
    open: state.rightSidebarOpen !== undefined ? state.rightSidebarOpen : true,
    updateOpen: (open: boolean) => updateState({ rightSidebarOpen: open })
  }
}
