declare module 'shiki' {
  export function createHighlighter(options: {
    themes: string[]
    langs: string[]
  }): Promise<{
    codeToHtml(code: string, options: {
      lang: string
      themes: { light: string; dark: string }
      defaultColor: boolean
      transformers: any[]
    }): string
    getLoadedLanguages(): string[]
  }>
}
