'use client'

import { Input } from "@/components/ui/input"
import { useTranslations } from "@/hooks/use-translations"

export default function InputFilled() {
  const t = useTranslations()

  return (
    <Input
      type="email"
      placeholder={t('demo.input.emailPlaceholder')}
      className="bg-secondary border-none shadow-none max-w-xs"
    />
  )
}

