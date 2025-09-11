'use client'

import { useLocale as useNextIntlLocale } from 'next-intl'
import { ClientCookieManager } from '@/lib/client-cookies'
import { useCallback } from 'react'

const supportedLocales = ['en', 'ru', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'hi']

export function useLocale() {
  const locale = useNextIntlLocale()
  const cookieManager = new ClientCookieManager()

  const setLocale = useCallback((newLocale: string) => {
    if (!supportedLocales.includes(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}`)
      return
    }

    // Save locale to cookies
    const currentState = cookieManager.getState()
    cookieManager.setState({
      ...currentState,
      locale: newLocale
    })

    // Reload the page to apply new locale
    window.location.reload()
  }, [cookieManager])

  const getLocaleFromCookie = useCallback(() => {
    const currentState = cookieManager.getState()
    return currentState.locale || 'en'
  }, [cookieManager])

  return {
    locale,
    setLocale,
    getLocaleFromCookie,
    supportedLocales
  }
}
