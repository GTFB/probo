import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  AlertTriangle, 
  MessageSquare, 
  User, 
  MousePointer,
  ChevronRight,
  Code,
  Layout,
  Palette
} from "lucide-react";

const componentCategories = [
  {
    title: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    href: "/components/accordion",
    icon: ChevronDown,
    count: 10,
    color: "bg-blue-500",
    variants: ["Default", "Outline", "Box", "Tabs", "Custom Trigger", "Disabled", "Media Content", "Highlight Active", "Box Contained"]
  },
  {
    title: "Basic Components",
    description: "Core UI components for alerts, dialogs, avatars, badges, and buttons.",
    href: "/components/basic",
    icon: Palette,
    count: 5,
    color: "bg-green-500",
    variants: ["Alert", "Alert Dialog", "Avatar", "Badge", "Button"]
  },
  {
    title: "Layout & Utilities",
    description: "Layout components, code examples, and utility components for demonstrations.",
    href: "/components/layout",
    icon: Layout,
    count: 5,
    color: "bg-purple-500",
    variants: ["Component Layout", "Demo Grid", "Code Example", "Inline Code", "Variant Demo"]
  }
];

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">UI Components Library</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Изучите и протестируйте все компоненты shadcn/ui. Выберите категорию для просмотра примеров и вариантов использования.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {componentCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Link key={category.title} href={category.href}>
              <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {category.count} компонентов
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Варианты:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.variants.slice(0, 3).map((variant) => (
                        <Badge key={variant} variant="outline" className="text-xs">
                          {variant}
                        </Badge>
                      ))}
                      {category.variants.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.variants.length - 3} еще
                        </Badge>
                      )}
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
            <h3 className="text-lg font-semibold">Как использовать</h3>
            <p className="text-sm text-muted-foreground">
              Выберите категорию компонентов выше, чтобы просмотреть все доступные варианты, 
              примеры кода и интерактивные демонстрации. Каждый компонент включает 
              подробную документацию и примеры использования.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
