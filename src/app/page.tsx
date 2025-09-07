'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

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
            className="w-32 h-16 mx-auto mb-4"
          />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Loading Application</h1>
        <p className="text-muted-foreground">Taking you to the main page</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
