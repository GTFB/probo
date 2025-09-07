'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PASSWORD_GROUPS } from '@/lib/settings'

export function PasswordGroupsInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Password Groups Configuration</h3>
      <p className="text-sm text-muted-foreground">
        Each section ID is automatically assigned to a password group based on the configuration below.
      </p>
      <div className="grid gap-4">
        {Object.entries(PASSWORD_GROUPS).map(([groupKey, config]) => (
          <Card key={groupKey}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{config.name}</CardTitle>
                <Badge variant="outline">{groupKey}</Badge>
              </div>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Password: </span>
                  <code className="bg-muted px-2 py-1 rounded text-sm">{config.password}</code>
                </div>
                <div>
                  <span className="text-sm font-medium">Sections: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {config.sections.map((section) => (
                      <Badge key={section} variant="secondary" className="text-xs">
                        {section === '*' ? 'All other sections' : `Section ${section}`}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {config.sections.includes('*') 
                    ? 'This group covers all sections not explicitly assigned to other groups'
                    : 'This group covers only the specified sections'
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
