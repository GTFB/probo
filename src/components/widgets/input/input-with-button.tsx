'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "@/hooks/use-translations"

export default function InputWithButton() {
  const t = useTranslations()

  return (
    <div className="w-full max-w-xs flex items-center gap-2">
      <Input 
        type="email" 
        placeholder={t('demo.input.emailPlaceholder')} 
      />
      <Button className="shadow">
        {t('demo.input.subscribeButton')}
      </Button>
    </div>
  )
}
