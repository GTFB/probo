'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "@/hooks/use-translations"

export default function InputFile() {
  const t = useTranslations()

  return (
    <div className="w-full max-w-xs">
      <Label htmlFor="picture">{t('demo.input.profilePicture')}</Label>
      <Input 
        id="picture" 
        type="file" 
        className="mt-1 file:pt-0.5" 
      />
    </div>
  )
}

