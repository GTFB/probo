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
import { US, RU, ES, FR, DE, IT, PT, JP, KR, CN, SA, IN } from 'country-flag-icons/react/3x2'

const languages = [
  { code: 'en', name: 'English', shortName: 'EN', flag: US },
  { code: 'ru', name: 'Русский', shortName: 'RU', flag: RU },
  { code: 'es', name: 'Español', shortName: 'ES', flag: ES },
  { code: 'fr', name: 'Français', shortName: 'FR', flag: FR },
  { code: 'de', name: 'Deutsch', shortName: 'DE', flag: DE },
  { code: 'it', name: 'Italiano', shortName: 'IT', flag: IT },
  { code: 'pt', name: 'Português', shortName: 'PT', flag: PT },
  { code: 'ja', name: '日本語', shortName: 'JP', flag: JP },
  { code: 'ko', name: '한국어', shortName: 'KR', flag: KR },
  { code: 'zh', name: '中文', shortName: 'CN', flag: CN },
  { code: 'ar', name: 'العربية', shortName: 'AR', flag: SA },
  { code: 'hi', name: 'हिन्दी', shortName: 'IN', flag: IN },
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
              <language.flag className="w-4 h-3 mr-1" />
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
            className={`h-8 w-8 p-0 hover:bg-muted transition-colors duration-200 border-0 focus:ring-0 focus:outline-none ${className}`}
          >
            <currentLanguage.flag className="w-4 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`cursor-pointer ${locale === language.code ? 'bg-accent' : ''}`}
            >
              <language.flag className="w-4 h-3 mr-2" />
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
            className={`${sizeClasses[size]} w-auto px-2 border-0 focus:ring-0 focus:outline-none ${className}`}
          >
            <Globe className="h-4 w-4" />
            {showText && (
              <currentLanguage.flag className="w-3 h-2 ml-1" />
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
              <language.flag className="w-4 h-3 mr-2" />
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
        <Button variant="ghost" size="sm" className={`h-8 w-auto px-2 border-0 focus:ring-0 focus:outline-none ${className}`}>
          {showGlobe && <Globe className="h-4 w-4 mr-2" />}
          {showText && (
            <>
              <span className="hidden sm:flex items-center gap-1">
                <currentLanguage.flag className="w-4 h-3" />
                {currentLanguage.name}
              </span>
              <span className="sm:hidden">
                <currentLanguage.flag className="w-4 h-3" />
              </span>
            </>
          )}
          {!showText && <currentLanguage.flag className="w-4 h-3" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${locale === language.code ? 'bg-accent' : ''}`}
          >
            <language.flag className="w-4 h-3 mr-2" />
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
