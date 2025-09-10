import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

// Can be imported from a shared config
const locales = ['en', 'ru', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'hi']

export default getRequestConfig(async () => {
  // Get locale from app state cookies first
  const cookieStore = await cookies()
  const appStateCookie = cookieStore.get('app-state')?.value
  let finalLocale = 'en' // default
  
  if (appStateCookie) {
    try {
      const appState = JSON.parse(appStateCookie)
      if (appState.locale && locales.includes(appState.locale)) {
        finalLocale = appState.locale
      }
    } catch (error) {
      console.warn('Failed to parse app state cookie in i18n:', error)
    }
  }

  return {
    locale: finalLocale,
    messages: (await import(`./locales/${finalLocale}.json`)).default
  }
})
