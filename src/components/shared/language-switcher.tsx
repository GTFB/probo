'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'

const languages = [
  { code: 'en', name: 'English', shortName: 'EN', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', shortName: 'RU', flag: '🇷🇺' },
  { code: 'es', name: 'Español', shortName: 'ES', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', shortName: 'FR', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', shortName: 'DE', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', shortName: 'IT', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', shortName: 'PT', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', shortName: 'JP', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', shortName: 'KR', flag: '🇰🇷' },
  { code: 'zh', name: '中文', shortName: 'CN', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', shortName: 'AR', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', shortName: 'IN', flag: '🇮🇳' },
]

type LanguageSwitcherVariant = 'default' | 'compact' | 'minimal' | 'inline'
type LanguageSwitcherSize = 'sm' | 'md' | 'lg'

interface LanguageSwitcherProps {
  variant?: LanguageSwitcherVariant
  size?: LanguageSwitcherSize
  showGlobe?: boolean
  showText?: boolean
  className?: string
}

export function LanguageSwitcher({ 
  variant = 'default',
  size = 'sm',
  showGlobe = true,
  showText = true,
  className = ''
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()
  const t = useTranslations('common')

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale)
  }

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8', 
    lg: 'h-10'
  }

  // Inline variant - все языки в ряд
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {showGlobe && <Globe className="h-4 w-4 text-muted-foreground" />}
        <div className="flex gap-1">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={locale === language.code ? "default" : "ghost"}
              size="sm"
              onClick={() => handleLanguageChange(language.code)}
              className="h-6 px-2 text-xs"
            >
              <span className="mr-1">{language.flag}</span>
              <span>{language.shortName}</span>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  // Minimal variant - только флаг
  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-6 w-6 p-0 ${className}`}
          >
            {currentLanguage.flag}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`cursor-pointer ${locale === language.code ? 'bg-accent' : ''}`}
            >
              <span className="mr-2">{language.flag}</span>
              <span>{language.name}</span>
              {locale === language.code && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Compact variant - иконка + опционально текст
  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${sizeClasses[size]} w-auto px-2 ${className}`}
          >
            <Globe className="h-4 w-4" />
            {showText && (
              <span className="ml-1 text-xs">{currentLanguage.flag}</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`cursor-pointer ${locale === language.code ? 'bg-accent' : ''}`}
            >
              <span className="mr-2">{language.flag}</span>
              <span>{language.name}</span>
              {locale === language.code && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Default variant - полный переключатель
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`h-8 w-auto px-2 ${className}`}>
          {showGlobe && <Globe className="h-4 w-4 mr-2" />}
          {showText && (
            <>
              <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
              <span className="sm:hidden">{currentLanguage.flag}</span>
            </>
          )}
          {!showText && currentLanguage.flag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${locale === language.code ? 'bg-accent' : ''}`}
          >
            <span className="mr-2">{language.flag}</span>
            <span>{language.name}</span>
            {locale === language.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
