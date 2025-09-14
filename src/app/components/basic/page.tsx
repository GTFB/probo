import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  ChevronRight,
  Code,
  Eye,
  AlertTriangle,
  MessageSquare,
  User,
  Tag,
  MousePointer
} from "lucide-react";

const basicComponents = [
  {
    title: "Alert",
    description: "Displays a callout for user attention with different variants and styles.",
    component: "AlertDemo",
    href: "/components/basic/alert",
    icon: AlertTriangle,
    color: "bg-orange-500"
  },
  {
    title: "Alert Dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    component: "AlertDialogDemo", 
    href: "/components/basic/alert-dialog",
    icon: MessageSquare,
    color: "bg-red-500"
  },
  {
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    component: "AvatarDemo",
    href: "/components/basic/avatar", 
    icon: User,
    color: "bg-blue-500"
  },
  {
    title: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    component: "BadgeDemo",
    href: "/components/basic/badge",
    icon: Tag,
    color: "bg-green-500"
  },
  {
    title: "Button",
    description: "Displays a button or a component that looks like a button with various styles.",
    component: "ButtonDemo",
    href: "/components/basic/button",
    icon: MousePointer,
    color: "bg-purple-500"
  }
];

export default function BasicComponentsPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center space-x-4">
        <Link href="/components">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к компонентам
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Basic Components</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Core UI components that form the foundation of your application. 
          These essential components provide basic functionality and styling.
        </p>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">5 компонентов</Badge>
          <Badge variant="outline">shadcn/ui</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {basicComponents.map((component) => {
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
            <h3 className="text-lg font-semibold">Основные компоненты</h3>
            <p className="text-sm text-muted-foreground">
              Эти компоненты являются основой любого интерфейса. Каждый компонент 
              включает различные варианты стилизации, состояния и конфигурации 
              для максимальной гибкости использования.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
