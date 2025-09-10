import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { PROJECT_SETTINGS } from '@/lib/settings'
import { getServerTheme, getThemeClasses, getThemeAttributes, getServerLeftSidebarState, getServerRightSidebarState, getAllSidebarClasses } from '@/lib/server-theme'
import { getSessionDataFromCookies } from '@/lib/cookies'
import AuthProvider, { SessionData } from '@/components/providers/AuthProvider';
import LeftSectionStateProvider from '@/components/providers/LeftSectionStateProvider'
import RightSectionStateProvider from '@/components/providers/RightSectionStateProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: PROJECT_SETTINGS.name,
  description: PROJECT_SETTINGS.description,
  icons: {
    icon: '/favicon.ico',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    slug: string
  }
}

export default async function RootLayout({
  children, params,
}: RootLayoutProps) {

  // Get theme from server
  const serverTheme = getServerTheme()

  const themeClasses = getThemeClasses(serverTheme)
  const themeAttributes = getThemeAttributes(serverTheme)

  const sessionData = getSessionDataFromCookies() as SessionData


  // Get sidebar states from server
  const leftSidebarState = getServerLeftSidebarState()
  const rightSidebarState = getServerRightSidebarState()
  const sidebarClasses = getAllSidebarClasses(leftSidebarState === 'open', rightSidebarState === 'open')

  
  return (
    <html
      lang="en"
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
        <AuthProvider initialSessionData={sessionData}>
          <LeftSectionStateProvider initialState={leftSidebarState }>
            <RightSectionStateProvider initialState={rightSidebarState}>
              <ThemeProvider
                attribute="class"
                defaultTheme={serverTheme}
                themes={['light', 'dark']}
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </RightSectionStateProvider>
          </LeftSectionStateProvider>
        </AuthProvider>
      </body>
    </html >
  )
}
