import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function BadgeRoundedDemo() {
  const t = useTranslations('components.badge.variants');

  return (
    <div className="flex items-center space-x-2">
      <Badge className="rounded-full">{t('rounded')}</Badge>
      <Badge variant="secondary" className="rounded-full">{t('secondary')}</Badge>
      <Badge variant="outline" className="rounded-full">{t('outline')}</Badge>
    </div>
  );
}
