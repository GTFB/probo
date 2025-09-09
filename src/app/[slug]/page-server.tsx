import { getServerTheme } from '@/lib/server-theme'
import { SectionPageClient } from './page-client'

interface PageProps {
  params: { slug: string }
}

export default function SectionPageServer({ params }: PageProps) {
  // Получаем серверную тему
  const serverTheme = getServerTheme()
  
  return <SectionPageClient serverTheme={serverTheme} />
}
