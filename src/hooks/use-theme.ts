'use client'

import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme(): Theme {
  const { theme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return 'light' // Default during SSR
  }

  return (resolvedTheme as Theme) || 'light'
}

