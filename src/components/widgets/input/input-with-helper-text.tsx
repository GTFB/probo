'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "@/hooks/use-translations"

export default function InputWithHelperText() {
  const t = useTranslations()

  return (
    <div className="w-full max-w-xs space-y-1.5">
      <Label htmlFor="email-address">{t('demo.input.emailLabel')}</Label>
      <Input 
        id="email-address" 
        type="email" 
        placeholder={t('demo.input.emailPlaceholder')} 
      />
      <p className="text-[0.8rem] text-muted-foreground">
        {t('demo.input.helperText')}
      </p>
    </div>
  )
}
