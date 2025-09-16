'use client'

import { Input } from "@/components/ui/input"
import { useTranslations } from "@/hooks/use-translations"

export default function InputWithRing() {
  const t = useTranslations()

  return (
    <Input
      type="email"
      placeholder={t('demo.input.emailPlaceholder')}
      className="max-w-xs focus-visible:ring-[3px] focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
    />
  )
}

