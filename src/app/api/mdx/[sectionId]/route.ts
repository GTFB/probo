import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

interface MDXFrontmatter {
  title: string
  icon: string
  nextButtonText: string
  ctaLink?: string
  ctaText?: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: { sectionId: string } }
) {
  try {
    const { sectionId } = params
    const mdxPath = join(process.cwd(), 'src', 'mdx', `${sectionId}.mdx`)
    
    const source = readFileSync(mdxPath, 'utf8')
    
    const { content, frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true }
    })

    return NextResponse.json({ 
      content: content.toString(),
      frontmatter: frontmatter as MDXFrontmatter
    })
  } catch (error) {
    console.error('Error loading MDX:', error)
    return NextResponse.json(
      { error: 'Failed to load MDX content' },
      { status: 500 }
    )
  }
}
