declare module 'react-zoom-pan-pinch' {
  import { ReactNode } from 'react'
  
  export interface TransformWrapperProps {
    minScale?: number
    maxScale?: number
    initialScale?: number
    limitToBounds?: boolean
    wheel?: {
      step?: number
      disabled?: boolean
    }
    panning?: {
      disabled?: boolean
    }
    children: (props: TransformComponentProps) => ReactNode
  }
  
  export interface TransformComponentProps {
    zoomIn: () => void
    zoomOut: () => void
    resetTransform: () => void
    [key: string]: any
  }
  
  export interface TransformComponentWrapperProps {
    wrapperStyle?: React.CSSProperties
    contentStyle?: React.CSSProperties
    children: ReactNode
  }
  
  export const TransformWrapper: React.FC<TransformWrapperProps>
  export const TransformComponent: React.FC<TransformComponentWrapperProps>
}
