'use client'

import { MDXProvider } from '@mdx-js/react'
import { ReactNode } from 'react'

interface MDXLayoutProps {
  children: ReactNode
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-heading font-extrabold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-heading font-bold mb-2" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-heading font-bold mb-4" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold mb-2" {...props} />,
  p: (props: any) => <p className="text-muted-foreground mb-4" {...props} />,
  ul: (props: any) => <ul className="space-y-2 mb-4" {...props} />,
  li: (props: any) => <li className="text-muted-foreground" {...props} />,
  strong: (props: any) => <strong className="text-primary font-semibold" {...props} />,
  a: (props: any) => <a className="text-primary hover:underline" {...props} />,
  div: (props: any) => <div {...props} />,
  span: (props: any) => <span {...props} />,
}

export function MDXLayout({ children }: MDXLayoutProps) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  )
}
