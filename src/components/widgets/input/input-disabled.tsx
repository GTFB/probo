'use client'

import { Input } from "@/components/ui/input"
import { useTranslations } from "@/hooks/use-translations"

export default function InputDisabled() {
  const t = useTranslations()

  return (
    <Input 
      type="email" 
      placeholder={t('demo.input.emailPlaceholder')} 
      disabled 
      className="max-w-xs" 
    />
  )
}

