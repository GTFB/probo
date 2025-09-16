'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "@/hooks/use-translations"

export default function InputWithLabel() {
  const t = useTranslations()

  return (
    <div className="w-full max-w-xs">
      <Label htmlFor="email">{t('demo.input.emailLabel')}</Label>
      <Input 
        id="email" 
        type="email" 
        placeholder={t('demo.input.emailPlaceholder')} 
        className="mt-0.5" 
      />
    </div>
  )
}
