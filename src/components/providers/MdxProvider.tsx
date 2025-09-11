'use client'
import { createContext, useContext, useState } from "react"
import { MdxFile } from "@/repositories/MdxRepository"

interface MdxProviderProps {
    children: React.ReactNode
    initialMdx: MdxFile | null
    
}

const MdxContext = createContext<{
    mdx: MdxFile | null
    setMdx: (mdx: MdxFile | null) => void
} | null>(null)

export function useMdx() {
    const context = useContext(MdxContext)
    if (!context) {
        throw new Error('useMdx must be used within an MdxProvider')
    }
    return context
}

export default function MdxProvider({ children,  initialMdx }: MdxProviderProps) {
    const [mdx, setMdx] = useState<MdxFile | null>(initialMdx)

    return <MdxContext.Provider value={{ mdx, setMdx }}>{children}</MdxContext.Provider>
}
