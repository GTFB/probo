'use client'

import { createContext, useCallback, useContext, useState } from "react"

const RightSectionStateContext = createContext<{
    rightSectionState: string
    setRightSectionState: (state: string) => void
}>({ rightSectionState: 'open', setRightSectionState: () => { } })

export function useRightSectionState() {
    return useContext(RightSectionStateContext)
}
export default function RightSectionStateProvider({ children, initialState }:
    { children: React.ReactNode, initialState: string }) {
    const [rightSectionState, setRightSectionState] = useState(initialState)

    const _setRightSectionState = useCallback((state: string) => {
        setRightSectionState(state)
        
        fetch(`/api/state`, {
            method: 'PATCH',
            body: JSON.stringify({ rightSidebarState: state }),
        }).catch(err => {
            console.error('Error setting rightSidebarState:', err)
        })
    }, [setRightSectionState])
    
    return <RightSectionStateContext.Provider value={{ rightSectionState, setRightSectionState:_setRightSectionState }}>
        {children}
    </RightSectionStateContext.Provider>
}