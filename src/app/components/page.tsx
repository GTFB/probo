import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComponentsHeader } from "@/components/shared/components-header";
import { PROJECT_SETTINGS } from "../../../settings";
import { useTranslations } from "next-intl";
import { 
  ChevronDown,
  ChevronRight,
  Code,
  Layout,
  Palette,
  AlertTriangle,
  AlertCircle
} from "lucide-react";

export default function ComponentsPage() {
  const t = useTranslations('components');
  
  const componentCategories = [
    {
      title: t('accordion.title'),
      description: t('accordion.description'),
      href: "/components/accordion",
      icon: ChevronDown,
      count: 10,
      color: "bg-blue-500",
      variants: ["Default", "Outline", "Box", "Tabs", "Custom Trigger", "Disabled", "Media Content", "Highlight Active", "Box Contained"]
    },
    {
      title: t('alert.title'),
      description: t('alert.description'),
      href: "/components/alert",
      icon: AlertTriangle,
      count: 10,
      color: "bg-orange-500",
      variants: ["Primary", "Destructive", "Success", "Warning", "Info", "With Background", "Soft", "Bootstrap", "Callout", "With Actions"]
    },
    {
      title: t('alertDialog.title'),
      description: t('alertDialog.description'),
      href: "/components/alert-dialog",
      icon: AlertCircle,
      count: 10,
      color: "bg-red-500",
      variants: ["Default", "With Icon", "Destructive", "Success", "Warning", "Info", "Custom", "Form", "Scrollable", "Animated"]
    },
    {
      title: t('basic.title'),
      description: t('basic.description'),
      href: "/components/basic",
      icon: Palette,
      count: 5,
      color: "bg-green-500",
      variants: ["Alert", "Alert Dialog", "Avatar", "Badge", "Button"]
    },
    {
      title: t('layout.title'),
      description: t('layout.description'),
      href: "/components/layout",
      icon: Layout,
      count: 5,
      color: "bg-purple-500",
      variants: ["Component Layout", "Demo Grid", "Code Example", "Inline Code", "Variant Demo"]
    }
  ];
  return (
    <div className="min-h-screen bg-background">
      <ComponentsHeader
        title={t('title')}
        description=""
        showHomeButton={false}
        badges={[]}
      />

      <div className={`mx-auto py-8 space-y-8 max-w-7xl ${PROJECT_SETTINGS.mobilePadding}`}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {componentCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.title} href={category.href}>
                <Card className="group cursor-pointer h-full flex flex-col">
                  <CardHeader className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${category.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{category.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3">
                        {category.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {category.count} {t('count')}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">{t('variants')}</p>
                      <div className="flex flex-wrap gap-1 min-h-[24px]">
                        {category.variants.slice(0, 3).map((variant) => (
                          <Badge key={variant} variant="outline" className="text-xs">
                            {variant}
                          </Badge>
                        ))}
                        {category.variants.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.variants.length - 3} {t('more')}
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

        <Card className="mt-12 info-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4 sm:flex-row sm:items-center sm:text-left sm:space-y-0 sm:space-x-4">
              <Code className="h-6 w-6 text-muted-foreground flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('howToUse.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('howToUse.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
