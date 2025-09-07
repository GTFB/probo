import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

// Simple password storage (in production, use proper hashing)
const PASSWORD_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' // "password" SHA256

export async function POST(request: NextRequest) {
  try {
    const { password, sectionId } = await request.json()
    
    if (!password || !sectionId) {
      return NextResponse.json({ error: 'Password and section ID required' }, { status: 400 })
    }

    // Hash the provided password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    
    // Check if password is correct
    if (hashedPassword === PASSWORD_HASH) {
      // Create session token
      const sessionToken = crypto.randomBytes(32).toString('hex')
      
      // Set cookie with session token
      const cookieStore = await cookies()
      cookieStore.set('mdx_access', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      
      return NextResponse.json({ success: true, message: 'Access granted' })
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
    const sessionToken = cookieStore.get('mdx_access')
    
    if (sessionToken) {
      return NextResponse.json({ authenticated: true })
    } else {
      return NextResponse.json({ authenticated: false })
    }
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
