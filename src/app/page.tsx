'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from '@/hooks/use-translations'

export default function HomePage() {
  const router = useRouter()
  const t = useTranslations()

  useEffect(() => {
    // Redirect to demo page
    router.push('/demo')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-6">
          <img 
            src="/logo.svg" 
            alt="Probo Logo" 
            className="w-64 h-32 mx-auto mb-4"
          />
        </div>
        <h1 className="text-2xl font-semibold mb-2">{t('common.loadingApplication')}</h1>
        <p className="text-muted-foreground">{t('common.takingToMainPage')}</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
