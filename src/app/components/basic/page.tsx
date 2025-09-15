import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComponentsHeader } from "@/components/shared/components-header";
import { PROJECT_SETTINGS } from "../../../../settings";
import { useTranslations } from "next-intl";
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

export default function BasicComponentsPage() {
  const t = useTranslations('basic');

  const basicComponents = [
    {
      title: t('components.alert.title'),
      description: t('components.alert.description'),
      component: "AlertDemo",
      href: "/components/basic/alert",
      icon: AlertTriangle,
      color: "bg-orange-500"
    },
    {
      title: t('components.alertDialog.title'),
      description: t('components.alertDialog.description'),
      component: "AlertDialogDemo", 
      href: "/components/basic/alert-dialog",
      icon: MessageSquare,
      color: "bg-red-500"
    },
    {
      title: t('components.avatar.title'),
      description: t('components.avatar.description'),
      component: "AvatarDemo",
      href: "/components/basic/avatar", 
      icon: User,
      color: "bg-blue-500"
    },
    {
      title: t('components.badge.title'),
      description: t('components.badge.description'),
      component: "BadgeDemo",
      href: "/components/basic/badge",
      icon: Tag,
      color: "bg-green-500"
    },
    {
      title: t('components.button.title'),
      description: t('components.button.description'),
      component: "ButtonDemo",
      href: "/components/basic/button",
      icon: MousePointer,
      color: "bg-purple-500"
    }
  ];
  return (
    <div className="min-h-screen bg-background">
      <ComponentsHeader
        title={t('title')}
        description=""
        showBackButton={true}
        backHref="/components"
        badges={[]}
      />
      
      <div className={`mx-auto py-8 space-y-8 max-w-7xl ${PROJECT_SETTINGS.mobilePadding}`}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {basicComponents.map((component) => {
            const IconComponent = component.icon;
            return (
              <Link key={component.title} href={component.href}>
                <Card className="group transition-all duration-200 cursor-pointer h-full">
                  <CardHeader className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${component.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{component.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
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

        <Card className="mt-12 bg-foreground/5">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4 sm:flex-row sm:items-center sm:text-left sm:space-y-0 sm:space-x-4">
              <Code className="h-6 w-6 text-muted-foreground flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('info.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('info.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
