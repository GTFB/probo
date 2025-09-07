import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'
import { PASSWORD_GROUPS } from '@/lib/settings'

// Helper function to get password hash
function getPasswordHash(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Helper function to find group by section ID
function findGroupBySection(sectionId: string): string {
  // Check each group to see if the section ID is in its sections array
  for (const [groupName, config] of Object.entries(PASSWORD_GROUPS)) {
    if (config.sections.includes(sectionId as any)) {
      return groupName
    }
  }
  
  // If no specific group found, check if any group has '*' (wildcard)
  for (const [groupName, config] of Object.entries(PASSWORD_GROUPS)) {
    if (config.sections.includes('*' as any)) {
      return groupName
    }
  }
  
  return 'default'
}

export async function POST(request: NextRequest) {
  try {
    const { password, sectionId } = await request.json()
    
    if (!password || !sectionId) {
      return NextResponse.json({ error: 'Password and section ID required' }, { status: 400 })
    }

    // Find the group for this section
    const groupName = findGroupBySection(sectionId)
    const groupConfig = PASSWORD_GROUPS[groupName as keyof typeof PASSWORD_GROUPS]
    
    if (!groupConfig) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
    }

    // Hash the provided password
    const hashedPassword = getPasswordHash(password)
    const expectedHash = getPasswordHash(groupConfig.password)
    
    // Check if password is correct for this group
    if (hashedPassword === expectedHash) {
      // Create session token with group info
      const sessionData = {
        token: crypto.randomBytes(32).toString('hex'),
        group: groupName,
        sections: groupConfig.sections,
        timestamp: Date.now()
      }
      
      // Set cookie with session data
      const cookieStore = await cookies()
      cookieStore.set('mdx_access', JSON.stringify(sessionData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      
      return NextResponse.json({ 
        success: true, 
        message: 'Access granted',
        group: groupName,
        groupName: groupConfig.name,
        groupDescription: groupConfig.description,
        sections: groupConfig.sections
      })
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('mdx_access')
    
    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(sessionCookie.value)
        const { group, sections, timestamp } = sessionData
        
        // Check if session is still valid (7 days)
        const isExpired = Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000
        
        if (isExpired) {
          return NextResponse.json({ authenticated: false })
        }
        
        return NextResponse.json({ 
          authenticated: true,
          group,
          sections
        })
      } catch (parseError) {
        return NextResponse.json({ authenticated: false })
      }
    } else {
      return NextResponse.json({ authenticated: false })
    }
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
