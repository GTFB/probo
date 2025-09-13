'use client'

import { useState, useCallback, useEffect } from 'react'
import { AppSidebar } from '@/components/blocks app/app-sidebar'
import { useWindowSize } from '@/hooks/use-window-size'
import { useTranslations } from '@/hooks/use-translations'
import { LanguageSwitcher } from '@/components/shared/language-switcher'
import { TableOfContents } from '@/components/blocks app/table-of-contents'
import { PROJECT_SETTINGS, NAVIGATION_ITEMS } from '@/lib/settings'
import { SearchEngine } from '@/components/shared/search-engine'
import { Button } from '@/components/ui/button'
import { MDXContent } from '@/components/shared/mdx-content'
import { ArrowRight, Menu, X, List, Sun, Moon } from 'lucide-react'
import { NavigationItem } from '@/types/proposal'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useRouter, useParams } from 'next/navigation'

interface MDXFrontmatter {
  title: string
  icon: string
  nextButtonText: string
  prevButtonText?: string
  ctaLink?: string
  ctaText?: string
}

// Use navigation from settings
const navigationItems: NavigationItem[] = NAVIGATION_ITEMS.map(item => ({
  id: item.id,
  title: item.title,
  icon: item.icon,
  href: item.href,
  slug: item.slug
}))

// Import icons for navigation (keep only those used in getIconByName)
import {
  FileText,
  Component,
  Users,
  Cpu,
  Share2,
  TestTube,
  CheckCircle,
  Code,
} from 'lucide-react'
import { useMdx } from '@/components/providers/MdxProvider'
import { useRightSectionState } from '@/components/providers/RightSectionStateProvider'
import { useLeftSectionState } from '@/components/providers/LeftSectionStateProvider'

// Function to get icon by name from frontmatter
const getIconByName = (iconName: string) => {
  const iconMap: Record<string, any> = {
    FileText,
    Component,
    Users,
    Cpu,
    Share2,
    TestTube,
    CheckCircle,
    Code,
  }
  return iconMap[iconName] || Component // Fallback to Component if icon not found
}

// Use navigation with icons from settings
const navigationItemsWithIcons = NAVIGATION_ITEMS

export default function SectionPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const t = useTranslations()

  // Find section by slug
  const currentSection = NAVIGATION_ITEMS.find(item => item.slug === slug)
  const activeSection = currentSection?.id || '1'
  const { mdx,  } = useMdx()


  const { rightSectionState, setRightSectionState } = useRightSectionState()
  const { leftSectionState, setLeftSectionState } = useLeftSectionState()

  const [currentFrontmatter, setCurrentFrontmatter] = useState<MDXFrontmatter | null>(mdx?.data || null)

  const [prevFrontmatter, setPrevFrontmatter] = useState<MDXFrontmatter | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentToc, setCurrentToc] = useState<Array<{ id: string; title: string; level: number; slug?: string }>>([])
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(leftSectionState !== 'close')
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(rightSectionState !== 'close')
  const [isRightOffcanvasOpen, setIsRightOffcanvasOpen] = useState(false)
  const { width } = useWindowSize()
  const [isContentLoading, setIsContentLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // During server-side rendering, always return false
    if (typeof window === 'undefined') return false

    // During client-side rendering, check localStorage
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme === 'dark'
      }
      // If no saved theme, use system theme
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      // Fallback: use system theme
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      } catch {
        return false
      }
    }
  })

  // Set theme after hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        const isDark = savedTheme === 'dark'
        setIsDarkMode(isDark)
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } else {
        // If no saved theme, use system theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDarkMode(prefersDark)
        if (prefersDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }
  }, [])

  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1) // Remove # from hash
      if (hash) {
        // Wait a bit for content to load
        setTimeout(() => {
          const element = document.getElementById(hash)
          console.log('Looking for element with ID:', hash, 'Found:', element)
          if (element) {
            console.log('Scrolling to element:', element)
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } else {
            console.log('Element not found, checking all elements with IDs:')
            const allElementsWithIds = document.querySelectorAll('[id]')
            allElementsWithIds.forEach(el => {
              console.log('Element ID:', el.id)
            })
          }
        }, 500)
      }
    }

    // Handle hash on initial load
    handleHashNavigation()

    // Handle hash changes (when user navigates with browser back/forward)
    window.addEventListener('hashchange', handleHashNavigation)

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  const handleSectionChange = useCallback((sectionId: string) => {
    const section = NAVIGATION_ITEMS.find(item => item.id === sectionId)
    if (section) {
      router.push(`/${section.slug}`)
    }
    setIsMobileMenuOpen(false)
  }, [router])

  const handleNextSection = useCallback(() => {
    const currentIndex = navigationItems.findIndex(item => item.id === activeSection)
    const nextIndex = (currentIndex + 1) % navigationItems.length
    const nextSection = navigationItems[nextIndex]
    router.push(`/${nextSection.slug}`)
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection, router])

  const handlePrevSection = useCallback(() => {
    const currentIndex = navigationItems.findIndex(item => item.id === activeSection)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : navigationItems.length - 1
    const prevSection = navigationItems[prevIndex]
    router.push(`/${prevSection.slug}`)
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection, router])

  const handleFrontmatterChange = useCallback((frontmatter: MDXFrontmatter) => {
    setPrevFrontmatter(currentFrontmatter)
    setCurrentFrontmatter(frontmatter)
  }, [currentFrontmatter])

  const handleTocChange = useCallback((toc: Array<{ id: string; title: string; level: number; slug?: string }>) => {
    setCurrentToc(toc)
  }, [])

  const handleH1Change = useCallback((h1Title: string) => {
    // Handle H1 title change if needed
  }, [])

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsContentLoading(loading)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    // Save theme to localStorage with additional check
    try {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }

    // Immediately apply changes to DOM
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Smooth theme transition for all elements
    const elements = document.querySelectorAll('.theme-transition')
    elements.forEach(el => {
      (el as HTMLElement).style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
    })

    // Remove transition after completion
    setTimeout(() => {
      elements.forEach(el => {
        (el as HTMLElement).style.transition = ''
      })
    }, 300)
  }, [isDarkMode])

  const sectionNumber = navigationItems.findIndex(item => item.id === activeSection) + 1


  // Redirect to first section if slug not found
  useEffect(() => {
    if (!currentSection && slug) {
      router.push('/demo')
    }
  }, [currentSection, slug, router])

  return (
    <div className="min-h-screen relative">
      {/* Desktop left sidebar */}
      <div
        className={`hidden lg:block fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out z-40 ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <SidebarProvider defaultOpen={true}>
          <AppSidebar
            items={navigationItemsWithIcons}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onToggle={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          />
        </SidebarProvider>
      </div>

      {/* Central section: Header, Content, Footer */}
      <div
        className="flex flex-col min-h-screen relative z-10 transition-all duration-300 ease-in-out w-full lg:w-auto"
        style={{
          width: width < 1024 ? '100%' : `calc(100% - ${isLeftSidebarOpen ? '256px' : '0px'} - ${isRightSidebarOpen ? '320px' : '0px'})`,
          marginLeft: width < 1024 ? '0px' : (isLeftSidebarOpen ? '256px' : '0px'),
          marginRight: width < 1024 ? '0px' : (isRightSidebarOpen ? '320px' : '0px'),
        }}
      >
        {/* Sticky Header for desktop */}
        <div className="hidden lg:block sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className={`px-4 sm:px-6 md:px-10 flex items-center transition-all duration-300 ease-in-out`} style={{ height: '72px' }}>
            <div className="flex items-center justify-between w-full">
              <div className={`flex items-center gap-4 transition-all duration-300 ease-in-out ${isLeftSidebarOpen ? '' : 'lg:ml-0'}`}>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  {(() => {
                    const IconComponent = getIconByName(currentFrontmatter?.icon || 'Gem')
                    return <IconComponent className="w-4 h-4 text-primary-foreground" />
                  })()}
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{currentFrontmatter?.title || 'Loading...'}</h1>
                  <p className="text-xs text-muted-foreground">Section {sectionNumber} of {navigationItems.length}</p>

                </div>
              </div>

              <div className="flex gap-2">
                {!isLeftSidebarOpen && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsLeftSidebarOpen(true)
                      setLeftSectionState('open')
                    }
                    }
                  >
                    <Menu className="w-4 h-4 mr-2" />
                    {t('common.navigation')}
                  </Button>
                )}
                {!isRightSidebarOpen && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsRightSidebarOpen(true)
                      setRightSectionState('open')

                    }}
                  >
                    <List className="w-4 h-4 mr-2" />
                    {t('common.tableOfContents')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile navigation */}
          <div className="lg:hidden">
            <div className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <div className="flex items-center justify-between px-4 py-3" style={{ height: '72px' }}>
                <div className="flex items-center gap-3">
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Menu className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 p-0">
                      <div className="px-6 py-3 flex items-center justify-between" style={{ height: '72px' }}>
                        <div className="flex items-center gap-2">
                          <div>
                            <h2 className="text-lg font-semibold">{PROJECT_SETTINGS.name}</h2>
                            <p className="text-xs text-muted-foreground">{PROJECT_SETTINGS.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-2">
                        <div className="space-y-1">
                          {navigationItemsWithIcons.map((item) => {
                            const Icon = item.icon
                            const isActive = activeSection === item.id

                            return (
                              <Button
                                key={item.id}
                                variant="ghost"
                                className={`w-full justify-start h-9 px-3 ${isActive ? "bg-accent" : ""}`}
                                onClick={() => handleSectionChange(item.id)}
                              >
                                <Icon className="w-4 h-4 mr-3" />
                                <span>{item.title}</span>
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg hidden sm:flex items-center justify-center">
                      {(() => {
                        const IconComponent = getIconByName(currentFrontmatter?.icon || 'Gem')
                        return <IconComponent className="w-4 h-4 text-primary-foreground" />
                      })()}
                    </div>
                    <div className="text-left">
                      <h2 className="text-sm font-medium">{currentFrontmatter?.title || 'Loading...'}</h2>
                      <p className="text-xs text-muted-foreground">Section {sectionNumber} of {navigationItems.length}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Sheet open={isRightOffcanvasOpen} onOpenChange={setIsRightOffcanvasOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <List className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 p-0">
                      <div className="px-4 py-3 flex items-center justify-between" style={{ height: '72px' }}>
                        <div className="flex items-center gap-2">
                          <div>
                            <h2 className="text-base font-semibold">{t('common.tableOfContents')}</h2>
                            <p className="text-xs text-muted-foreground">{t('common.sectionNavigation')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <LanguageSwitcher variant="minimal" />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-4 hover:bg-muted transition-colors duration-200 border-0 focus:ring-0 focus:outline-none mr-5"
                            onClick={toggleTheme}
                          >
                            {isDarkMode ? (
                              <Sun className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
                            ) : (
                              <Moon className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="px-2 py-2 overflow-y-auto scrollbar-hide h-[calc(100vh-72px)]">
                        <div className="space-y-1 mb-6">
                          {currentToc.length === 0 ? (
                            <p className="text-sm text-muted-foreground">{t('common.noHeadings')}</p>
                          ) : (
                            currentToc.map((item) => (
                              <Button
                                key={item.id}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-left h-auto py-2 px-3"
                                style={{ paddingLeft: `${(item.level - 1) * 16 + 12}px` }}
                                onClick={() => {
                                  const element = document.getElementById(item.id)
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })

                                    // Update URL with hash
                                    if (item.slug) {
                                      const newUrl = `${window.location.pathname}#${item.slug}`
                                      window.history.pushState(null, '', newUrl)
                                    }
                                  } else {
                                    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
                                    headings.forEach(heading => {
                                      if (heading.textContent?.trim() === item.title) {
                                        heading.scrollIntoView({ behavior: 'smooth', block: 'start' })

                                        // Update URL with hash
                                        if (item.slug) {
                                          const newUrl = `${window.location.pathname}#${item.slug}`
                                          window.history.pushState(null, '', newUrl)
                                        }
                                      }
                                    })
                                  }
                                }}
                              >
                                <div className="flex flex-col items-start w-full">
                                  <span className="text-sm truncate">{item.title}</span>
                                </div>
                              </Button>
                            ))
                          )}
                        </div>

                        <div className="border-t pt-4 px-2">
                          <h4 className="text-sm font-semibold mb-2">{t('common.search')}</h4>
                          <SearchEngine
                            onResultClick={(result) => {
                              const element = document.getElementById(result.id)
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                              } else {
                                const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
                                headings.forEach(heading => {
                                  if (heading.textContent?.trim() === result.title) {
                                    heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                  }
                                })
                              }
                            }}
                            onSectionChange={handleSectionChange}
                          />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pb-16 px-4 sm:px-6 md:px-6 lg:px-10 mobile-header-offset">
            <div className="w-full">
              <section>
                <div className="mb-8">
                  <MDXContent
                    sectionId={activeSection}
                    onFrontmatterChange={handleFrontmatterChange}
                    onTocChange={handleTocChange}
                    onH1Change={handleH1Change}
                    onLoadingChange={handleLoadingChange}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t py-2 h-16 z-30">
          <div className="flex flex-col gap-2 lg:px-10 py-4 items-center justify-center h-full">
            {/* Desktop navigation */}
            <div className={`hidden lg:flex w-full gap-4 transition-opacity duration-300 ${(currentFrontmatter?.prevButtonText || prevFrontmatter?.prevButtonText) && (currentFrontmatter?.nextButtonText || prevFrontmatter?.nextButtonText)
                ? 'justify-between'
                : (currentFrontmatter?.prevButtonText || prevFrontmatter?.prevButtonText)
                  ? 'justify-start'
                  : 'justify-end'
              }`}>
              {(currentFrontmatter?.prevButtonText || prevFrontmatter?.prevButtonText) && (
                <Button variant="outline" size="sm" onClick={handlePrevSection}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {currentFrontmatter?.prevButtonText || prevFrontmatter?.prevButtonText}
                </Button>
              )}

              {!isContentLoading && (currentFrontmatter?.nextButtonText || prevFrontmatter?.nextButtonText) && (
                <Button variant="outline" size="sm" onClick={handleNextSection}>
                  <span>
                    {currentFrontmatter?.nextButtonText || prevFrontmatter?.nextButtonText}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>

            {/* Mobile navigation */}
            <div className={`lg:hidden flex w-full px-4 sm:px-6 md:px-6 gap-4 transition-opacity duration-300 ${(currentFrontmatter?.prevButtonText || prevFrontmatter?.prevButtonText) && (currentFrontmatter?.nextButtonText || prevFrontmatter?.nextButtonText)
                ? 'justify-between'
                : (currentFrontmatter?.prevButtonText || prevFrontmatter?.prevButtonText)
                  ? 'justify-start'
                  : 'justify-end'
              }`}>
              {(currentFrontmatter?.prevButtonText || prevFrontmatter?.prevButtonText) && (
                <Button variant="outline" size="sm" onClick={handlePrevSection}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {t('common.back')}
                </Button>
              )}

              {!isContentLoading && (currentFrontmatter?.nextButtonText || prevFrontmatter?.nextButtonText) && (
                <Button variant="outline" size="sm" onClick={handleNextSection}>
                  <span>{t('common.forward')}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Desktop right table of contents */}
      <div
        className={`hidden lg:block fixed top-0 right-0 h-full w-80 bg-background border-l transition-transform duration-300 ease-in-out z-40 ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <TableOfContents
          items={currentToc}
          activeSection={activeSection}
          onSectionClick={handleSectionChange}
          onSectionChange={handleSectionChange}
          onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        />
      </div>
    </div>
  )
}

