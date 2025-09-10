'use client'

import { createContext, useCallback, useContext, useState } from "react"

const LeftSectionStateContext = createContext<{
    leftSectionState: string
    setLeftSectionState: (state: string) => void
}>({ leftSectionState: 'open', setLeftSectionState: () => { } })

export function useLeftSectionState() {
    return useContext(LeftSectionStateContext)
}
export default function LeftSectionStateProvider({ children, initialState }:
    { children: React.ReactNode, initialState: string }) {
    const [leftSectionState, setLeftSectionState] = useState(initialState)
    const _setLeftSectionState = useCallback((state: string) => {
        setLeftSectionState(state)
        fetch(`/api/state`, {
            method: 'PATCH',
            body: JSON.stringify({ leftSidebarState: state }),
        }).catch(err => {
            console.error('Error setting leftSidebarState:', err)
        })
    }, [setLeftSectionState])
    
    return <LeftSectionStateContext.Provider value={{ leftSectionState, setLeftSectionState:_setLeftSectionState }}>
        {children}
    </LeftSectionStateContext.Provider>
}