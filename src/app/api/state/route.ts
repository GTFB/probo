import { NextRequest, NextResponse } from 'next/server'
import { ServerCookieManager, getStateFromRequest, setStateToResponse } from '@/lib/cookies'
import { validateAppState, migrateAppState } from '@/lib/client-cookies'

// GET - получить состояние
export async function GET(request: NextRequest) {
  try {
    const state = getStateFromRequest(request)
    const migratedState = migrateAppState(state)
    
    return NextResponse.json({ 
      success: true, 
      state: migratedState 
    })
  } catch (error) {
    console.error('Error getting app state:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get app state' },
      { status: 500 }
    )
  }
}

// POST - установить состояние
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!validateAppState(body)) {
      return NextResponse.json(
        { success: false, error: 'Invalid app state format' },
        { status: 400 }
      )
    }

    const migratedState = migrateAppState(body)
    const response = NextResponse.json({ 
      success: true, 
      state: migratedState 
    })
    
    return setStateToResponse(response, migratedState)
  } catch (error) {
    console.error('Error setting app state:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to set app state' },
      { status: 500 }
    )
  }
}

// PATCH - обновить состояние
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const currentState = getStateFromRequest(request)
    const migratedCurrentState = migrateAppState(currentState)
    
    const updatedState = { ...migratedCurrentState, ...body }
    
    if (!validateAppState(updatedState)) {
      return NextResponse.json(
        { success: false, error: 'Invalid app state format' },
        { status: 400 }
      )
    }

    const response = NextResponse.json({ 
      success: true, 
      state: updatedState 
    })
    
    return setStateToResponse(response, updatedState)
  } catch (error) {
    console.error('Error updating app state:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update app state' },
      { status: 500 }
    )
  }
}

// DELETE - очистить состояние
export async function DELETE() {
  try {
    const response = NextResponse.json({ 
      success: true, 
      message: 'App state cleared' 
    })
    
    response.cookies.delete('app-state')
    return response
  } catch (error) {
    console.error('Error clearing app state:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to clear app state' },
      { status: 500 }
    )
  }
}
