import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function BadgeDemo() {
  const t = useTranslations('components.badge.variants');

  return (
    <div className="flex items-center space-x-2">
      <Badge>{t('default')}</Badge>
      <Badge variant="secondary">{t('secondary')}</Badge>
      <Badge variant="outline">{t('outline')}</Badge>
      <Badge variant="destructive">{t('destructive')}</Badge>
    </div>
  );
}
