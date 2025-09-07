import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { sectionId: string } }
) {
  try {
    const { sectionId } = params
    
    // Validate sectionId
    if (!sectionId || typeof sectionId !== 'string') {
      console.error('Invalid sectionId:', sectionId)
      return NextResponse.json(
        { error: 'Invalid section ID' },
        { status: 400 }
      )
    }
    
    const mdxPath = join(process.cwd(), 'content', `${sectionId}.mdx`)
    console.log('Looking for MDX file at:', mdxPath)
    
    // Check file existence
    if (!existsSync(mdxPath)) {
      console.error('MDX file not found:', mdxPath)
      return NextResponse.json(
        { error: `MDX file not found: ${sectionId}.mdx` },
        { status: 404 }
      )
    }
    
    const source = readFileSync(mdxPath, 'utf8')
    console.log('Successfully loaded MDX file:', sectionId)
    
    // Simple function to extract frontmatter
    function extractFrontmatter(content: string) {
      try {
        const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
        if (frontmatterMatch) {
          const frontmatterText = frontmatterMatch[1]
          const frontmatter: any = {}
          
          frontmatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':')
            if (key && valueParts.length > 0) {
              let value: any = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
              
              // Convert boolean values
              if (value === 'true') {
                value = true
              } else if (value === 'false') {
                value = false
              }
              
              frontmatter[key.trim()] = value
            }
          })
          
          return frontmatter
        }
        return null
      } catch (error) {
        console.error('Error extracting frontmatter:', error)
        return null
      }
    }
    
    // Extract frontmatter and content
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
