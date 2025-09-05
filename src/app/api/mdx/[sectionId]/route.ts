import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { sectionId: string } }
) {
  try {
    const { sectionId } = params
    const mdxPath = join(process.cwd(), 'content', `${sectionId}.mdx`)
    
    const source = readFileSync(mdxPath, 'utf8')
    
    // Простая функция для извлечения frontmatter
    function extractFrontmatter(content: string) {
      const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
      if (frontmatterMatch) {
        const frontmatterText = frontmatterMatch[1]
        const frontmatter: any = {}
        
        frontmatterText.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':')
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
            frontmatter[key.trim()] = value
          }
        })
        
        return frontmatter
      }
      return null
    }
    
    // Извлекаем frontmatter и контент
    const frontmatter = extractFrontmatter(source)
    const content = source.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
    
    return NextResponse.json({ 
      content,
      frontmatter
    })
  } catch (error) {
    console.error('Error loading MDX:', error)
    return NextResponse.json(
      { error: 'Failed to load MDX content' },
      { status: 500 }
    )
  }
}
