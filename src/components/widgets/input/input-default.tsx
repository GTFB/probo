'use client'

import { Input } from "@/components/ui/input"
import { useTranslations } from "@/hooks/use-translations"

export default function InputDefault() {
  const t = useTranslations()

  return (
    <Input 
      type="email" 
      placeholder={t('demo.input.emailPlaceholder')} 
      className="max-w-xs" 
    />
  )
}

