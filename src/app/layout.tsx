import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PROJECT_SETTINGS } from '@/lib/settings'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: PROJECT_SETTINGS.name,
  description: PROJECT_SETTINGS.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    // Если нет сохраненной темы, используем системную
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                } catch (e) {
                  // Fallback: используем системную тему
                  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                }
                
                // Подавляем warning о лишних атрибутах от расширений браузера
                const originalConsoleError = console.error;
                console.error = function(...args) {
                  if (args[0] && args[0].includes && args[0].includes('Extra attributes from the server')) {
                    return;
                  }
                  originalConsoleError.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
