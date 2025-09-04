'use client'

import { ReactNode } from 'react'

interface MDXLayoutProps {
  children: ReactNode
}

export function MDXLayout({ children }: MDXLayoutProps) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <style jsx global>{`
        .prose h1 {
          @apply text-4xl font-heading font-extrabold mb-4 text-foreground;
        }
        .prose h2 {
          @apply text-3xl font-heading font-bold mb-2 text-foreground;
        }
        .prose h3 {
          @apply text-2xl font-heading font-bold mb-4 text-foreground;
        }
        .prose h4 {
          @apply text-lg font-bold mb-2 text-foreground;
        }
        .prose p {
          @apply text-muted-foreground mb-4;
        }
        .prose ul {
          @apply space-y-2 mb-4;
        }
        .prose li {
          @apply text-muted-foreground;
        }
        .prose strong {
          @apply text-primary font-semibold;
        }
        .prose a {
          @apply text-primary hover:underline;
        }
        .prose div {
          @apply mb-4;
        }
        .prose span {
          @apply inline;
        }
      `}</style>
      {children}
    </div>
  )
}
