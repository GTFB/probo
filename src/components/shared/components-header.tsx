import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { PROJECT_SETTINGS } from "../../../settings";
import { ArrowLeft, Home, Code } from "lucide-react";
import { useTranslations } from "next-intl";

interface ComponentsHeaderProps {
  title: string;
  description: string;
  showBackButton?: boolean;
  backHref?: string;
  badges?: Array<{
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  }>;
  showHomeButton?: boolean;
}

export function ComponentsHeader({
  title,
  description,
  showBackButton = false,
  backHref = "/components",
  badges = [],
  showHomeButton = false
}: ComponentsHeaderProps) {
  const t = useTranslations('common');
  
  return (
    <div className="border-b bg-background/80 backdrop-blur sticky top-0 z-50">
      <div className={`mx-auto py-4 max-w-7xl ${PROJECT_SETTINGS.mobilePadding}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {showHomeButton && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="btn-nav">
                  <Home className="h-4 w-4 mr-2" />
                  {t('home')}
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {showBackButton && (
              <Link href={backHref}>
                <Button variant="ghost" size="sm" className="btn-nav p-1 gap-0 h-6">
                  <ArrowLeft className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">{t('back')}</span>
                </Button>
              </Link>
            )}
            <LanguageSwitcher variant="minimal" size="sm" />
            <ThemeToggle variant="minimal" size="sm" />
          </div>
        </div>

        {description && (
          <div className="mt-4">
            <p className="text-muted-foreground text-lg max-w-3xl">
              {description}
            </p>
          </div>
        )}

        {badges.length > 0 && (
          <div className="mt-4 flex items-center space-x-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant={badge.variant || "secondary"}>
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

