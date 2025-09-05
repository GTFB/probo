'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

interface SearchIndex {
  id: string
  title: string
  content: string
  section: string
  sectionId: string
  level: number
  position: number
}

interface SearchResult {
  id: string
  title: string
  content: string
  section: string
  sectionId: string
  level: number
  position: number
  relevance: number
  highlightedContent: string
}

interface SearchEngineProps {
  onResultClick: (result: SearchResult) => void
  onSectionChange?: (sectionId: string) => void
  className?: string
}

export function SearchEngine({ onResultClick, onSectionChange, className }: SearchEngineProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchIndex, setSearchIndex] = useState<SearchIndex[]>([])
  const [isIndexed, setIsIndexed] = useState(false)

  // Алгоритм индексации контента
  const indexContent = useCallback(async () => {
    try {
      setIsSearching(true)
      
      // Получаем все MDX файлы с их названиями разделов
      const mdxFiles = [
        { id: '1-intro', name: 'Введение и цели проекта' },
        { id: '2-functions', name: 'Функциональные требования' },
        { id: '3-use-cases', name: 'Пользовательские сценарии' },
        { id: '4-tech-spec', name: 'Технические требования' },
        { id: '5-api', name: 'Программные интерфейсы (API)' },
        { id: '6-tests', name: 'Процедура приемки' },
        { id: '7-finish', name: 'Заключение и План Реализации' }
      ]
      
      const index: SearchIndex[] = []
      
      for (const file of mdxFiles) {
        try {
          const response = await fetch(`/api/mdx/${file.id}`)
          if (!response.ok) continue
          
          const data = await response.json()
          const content = data.content || ''
          
          // Парсим заголовки и контент
          const lines = content.split('\n')
          let currentSection = file.name
          let position = 0
          
          for (const line of lines) {
            const trimmedLine = line.trim()
            
            // Заголовки
            if (trimmedLine.startsWith('# ')) {
              const title = trimmedLine.substring(2)
              const id = `h1-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
              currentSection = title
              
              index.push({
                id,
                title,
                content: title,
                section: currentSection,
                sectionId: file.id,
                level: 1,
                position: position++
              })
            } else if (trimmedLine.startsWith('## ')) {
              const title = trimmedLine.substring(3)
              const id = `h2-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
              
              index.push({
                id,
                title,
                content: title,
                section: currentSection,
                sectionId: file.id,
                level: 2,
                position: position++
              })
            } else if (trimmedLine.startsWith('### ')) {
              const title = trimmedLine.substring(4)
              const id = `h3-${title.toLowerCase().replace(/[^a-zа-я0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
              
              index.push({
                id,
                title,
                content: title,
                section: currentSection,
                sectionId: file.id,
                level: 3,
                position: position++
              })
            } else if (trimmedLine && !trimmedLine.startsWith('---')) {
              // Обычный контент
              const words = trimmedLine.split(' ')
              if (words.length >= 3) { // Индексируем только предложения с 3+ словами
                index.push({
                  id: `content-${position}`,
                  title: words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : ''),
                  content: trimmedLine,
                  section: currentSection,
                  sectionId: file.id,
                  level: 0,
                  position: position++
                })
              }
            }
          }
        } catch (error) {
          console.warn(`Failed to index ${file}:`, error)
        }
      }
      
      setSearchIndex(index)
      setIsIndexed(true)
    } catch (error) {
      console.error('Indexing failed:', error)
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Алгоритм поиска с релевантностью
  const searchContent = useCallback((searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim() || !isIndexed) return []
    
    const query = searchQuery.toLowerCase().trim()
    const queryWords = query.split(/\s+/).filter(word => word.length > 2)
    
    const scoredResults: SearchResult[] = []
    
    for (const item of searchIndex) {
      let relevance = 0
      let highlightedContent = item.content
      
      // Точное совпадение в заголовке
      if (item.title.toLowerCase().includes(query)) {
        relevance += 100
        highlightedContent = item.title.replace(
          new RegExp(`(${query})`, 'gi'),
          '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
        )
      }
      
      // Совпадение в контенте
      if (item.content.toLowerCase().includes(query)) {
        relevance += 50
        highlightedContent = item.content.replace(
          new RegExp(`(${query})`, 'gi'),
          '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
        )
      }
      
      // Поиск по словам
      for (const word of queryWords) {
        if (item.title.toLowerCase().includes(word)) {
          relevance += 20
        }
        if (item.content.toLowerCase().includes(word)) {
          relevance += 10
        }
      }
      
      // Бонус за уровень заголовка (H1 > H2 > H3 > контент)
      if (item.level === 1) relevance += 30
      else if (item.level === 2) relevance += 20
      else if (item.level === 3) relevance += 10
      
      if (relevance > 0) {
        scoredResults.push({
          ...item,
          relevance,
          highlightedContent
        })
      }
    }
    
    // Сортируем по релевантности
    return scoredResults.sort((a, b) => b.relevance - a.relevance).slice(0, 10)
  }, [searchIndex, isIndexed])

  // Обработка поиска
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim()) {
      const searchResults = searchContent(searchQuery)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [searchContent])

  // Индексация при монтировании
  useEffect(() => {
    if (!isIndexed) {
      indexContent()
    }
  }, [indexContent, isIndexed])

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Поисковая строка */}
        <div className="relative">
          <Input
            placeholder="Поиск по контенту..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pr-10"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => {
                setQuery('')
                setResults([])
              }}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Статус индексации */}
        {!isIndexed && (
          <div className="text-xs text-muted-foreground text-center">
            {isSearching ? 'Индексация контента...' : 'Подготовка поиска...'}
          </div>
        )}

        {/* Результаты поиска */}
        {query && results.length > 0 && (
          <div className="space-y-2 h-full overflow-y-auto" style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="text-xs text-muted-foreground">
              Найдено: {results.length} результатов
            </div>
            <div className="flex flex-col h-full gap-2" style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}>
              {results.map((result) => (
                <Card 
                  key={result.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors flex-1"
                  onClick={() => onResultClick(result)}
                >
                  <CardContent className="p-3 h-full flex flex-col justify-center">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            result.level === 1 ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' :
                            result.level === 2 ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' :
                            result.level === 3 ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' :
                            'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                            {result.level === 1 ? 'H1' : result.level === 2 ? 'H2' : result.level === 3 ? 'H3' : 'Текст'}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {result.section}
                          </span>
                          {onSectionChange && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 px-2 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                onSectionChange(result.sectionId)
                              }}
                            >
                              Перейти
                            </Button>
                          )}
                        </div>
                        <div 
                          className="text-sm font-medium mb-1"
                          dangerouslySetInnerHTML={{ __html: result.highlightedContent }}
                        />
                        <div className="text-xs text-muted-foreground">
                          Релевантность: {result.relevance}%
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Нет результатов */}
        {query && results.length === 0 && isIndexed && (
          <div className="text-center text-muted-foreground py-4">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Ничего не найдено</p>
            <p className="text-xs">Попробуйте другие ключевые слова</p>
          </div>
        )}
      </div>
    </div>
  )
}
