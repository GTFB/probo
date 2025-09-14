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
  Copy
} from "lucide-react";

const accordionVariants = [
  {
    title: "Default Accordion",
    description: "Standard accordion with basic styling and functionality.",
    component: "AccordionDemo",
    href: "/components/accordion/default"
  },
  {
    title: "Outline Accordion", 
    description: "Accordion with outline border styling for better visual separation.",
    component: "AccordionOutlineDemo",
    href: "/components/accordion/outline"
  },
  {
    title: "Box Accordion",
    description: "Accordion with box-style containers for each item.",
    component: "AccordionBoxDemo", 
    href: "/components/accordion/box"
  },
  {
    title: "Box Contained",
    description: "Box accordion with contained styling and rounded corners.",
    component: "AccordionBoxContainedDemo",
    href: "/components/accordion/box-contained"
  },
  {
    title: "Tabs Accordion",
    description: "Accordion styled to look like tabs with horizontal layout.",
    component: "AccordionTabsDemo",
    href: "/components/accordion/tabs"
  },
  {
    title: "Custom Trigger",
    description: "Accordion with custom trigger elements and styling.",
    component: "AccordionCustomTriggerDemo",
    href: "/components/accordion/custom-trigger"
  },
  {
    title: "Disabled State",
    description: "Accordion with disabled items and proper accessibility.",
    component: "AccordionDisabledDemo",
    href: "/components/accordion/disabled"
  },
  {
    title: "Highlight Active",
    description: "Accordion that highlights the currently active item.",
    component: "AccordionHighlightActiveDemo",
    href: "/components/accordion/highlight-active"
  },
  {
    title: "Media Content",
    description: "Accordion with rich media content like images and videos.",
    component: "AccordionMediaContentDemo",
    href: "/components/accordion/media-content"
  }
];

export default function AccordionPage() {
  return (
    <div className="min-h-screen bg-background">
      <ComponentsHeader
        title="Accordion Components"
        description="A vertically stacked set of interactive headings that each reveal a section of content. Choose from various styling options and configurations."
        showBackButton={true}
        backHref="/components"
        badges={[
          { text: "10 вариантов", variant: "secondary" },
          { text: "shadcn/ui", variant: "outline" }
        ]}
      />
      
      <div className="container mx-auto py-8 space-y-8">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accordionVariants.map((variant) => (
          <Link key={variant.title} href={variant.href}>
            <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <Code className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <CardTitle className="text-lg">{variant.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {variant.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {variant.component}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>Просмотр</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-4">
          <Code className="h-6 w-6 text-muted-foreground mt-1" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Использование</h3>
            <p className="text-sm text-muted-foreground">
              Нажмите на любой вариант выше, чтобы увидеть интерактивную демонстрацию, 
              примеры кода и подробную документацию по использованию компонента.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}