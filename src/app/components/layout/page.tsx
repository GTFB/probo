import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComponentsHeader } from "@/components/shared/components-header";
import { 
  ArrowLeft,
  ChevronRight,
  Code,
  Eye,
  Layout,
  Grid3X3,
  FileText,
  Terminal,
  Palette
} from "lucide-react";

const layoutComponents = [
  {
    title: "Component Layout",
    description: "Layout wrapper for organizing and displaying component demonstrations.",
    component: "ComponentLayout",
    href: "/components/layout/component-layout",
    icon: Layout,
    color: "bg-blue-500"
  },
  {
    title: "Demo Grid",
    description: "Grid layout for organizing multiple component demonstrations.",
    component: "DemoGrid",
    href: "/components/layout/demo-grid",
    icon: Grid3X3,
    color: "bg-green-500"
  },
  {
    title: "Code Example",
    description: "Component for displaying code examples with syntax highlighting.",
    component: "CodeExample",
    href: "/components/layout/code-example",
    icon: FileText,
    color: "bg-purple-500"
  },
  {
    title: "Inline Code Example",
    description: "Inline code display component for small code snippets.",
    component: "InlineCodeExample",
    href: "/components/layout/inline-code",
    icon: Terminal,
    color: "bg-orange-500"
  },
  {
    title: "Variant Demo",
    description: "Component for demonstrating different variants of UI elements.",
    component: "VariantDemo",
    href: "/components/layout/variant-demo",
    icon: Palette,
    color: "bg-pink-500"
  }
];

export default function LayoutComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ComponentsHeader
        title="Layout & Utility Components"
        description="Layout components, code examples, and utility components for organizing and displaying content in your application."
        showBackButton={true}
        backHref="/components"
        badges={[
          { text: "5 компонентов", variant: "secondary" },
          { text: "shadcn/ui", variant: "outline" }
        ]}
      />
      
      <div className="container mx-auto py-8 space-y-8">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {layoutComponents.map((component) => {
          const IconComponent = component.icon;
          return (
            <Link key={component.title} href={component.href}>
              <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${component.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{component.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {component.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {component.component}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      <span>Просмотр</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-4">
          <Code className="h-6 w-6 text-muted-foreground mt-1" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Утилиты и макеты</h3>
            <p className="text-sm text-muted-foreground">
              Эти компоненты помогают организовать контент, отображать код, 
              создавать сетки и демонстрировать различные варианты компонентов. 
              Идеально подходят для документации и демонстраций.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
