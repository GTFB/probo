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
          font-size: 2.25rem;
          line-height: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: hsl(var(--foreground));
        }
        .prose h2 {
          font-size: 1.875rem;
          line-height: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: hsl(var(--foreground));
        }
        .prose h3 {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: hsl(var(--foreground));
        }
        .prose h4 {
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: hsl(var(--foreground));
        }
        .prose p {
          color: hsl(var(--muted-foreground));
          margin-bottom: 1rem;
        }
        .prose ul {
          margin-bottom: 1rem;
        }
        .prose li {
          color: hsl(var(--muted-foreground));
        }
        .prose strong {
          color: hsl(var(--primary));
          font-weight: 600;
        }
        .prose a {
          color: hsl(var(--primary));
          text-decoration: none;
        }
        .prose a:hover {
          text-decoration: underline;
        }
        .prose div {
          margin-bottom: 1rem;
        }
        .prose span {
          display: inline;
        }
      `}</style>
      {children}
    </div>
  )
}
