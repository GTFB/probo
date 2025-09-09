import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import './globals.css'
import { PROJECT_SETTINGS } from '@/lib/settings'
import { getServerTheme, getThemeClasses, getThemeAttributes, getServerLeftSidebarState, getServerRightSidebarState, getAllSidebarClasses } from '@/lib/server-theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: PROJECT_SETTINGS.name,
  description: PROJECT_SETTINGS.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,...props
}: {
  children: React.ReactNode
}) {

  // Получаем тему с сервера
  const serverTheme = getServerTheme()
  const themeClasses = getThemeClasses(serverTheme)
  const themeAttributes = getThemeAttributes(serverTheme)
  
  // Получаем состояния сайдбаров с сервера
  const leftSidebarOpen = getServerLeftSidebarState()
  const rightSidebarOpen = getServerRightSidebarState()
  const sidebarClasses = getAllSidebarClasses(leftSidebarOpen, rightSidebarOpen)
  
  // Отладочная информация
  console.log('Server state:', { serverTheme, themeClasses, themeAttributes, leftSidebarOpen, rightSidebarOpen, sidebarClasses })

  return (
    <html 
      lang="ru" 
      className={`${themeClasses} ${sidebarClasses}`}
      {...themeAttributes}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme={serverTheme}
          themes={['light', 'dark']}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
