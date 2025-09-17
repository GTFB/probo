import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BadgeWithIconDemo() {
  const t = useTranslations('components.badge.variants');

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Badge className="rounded-full pl-1 gap-1.5">
        <ArrowLeftIcon className="h-4 w-4" />
        {t('left')}
      </Badge>
      <Badge className="rounded-full pr-1 gap-1.5">
        {t('right')}
        <ArrowRightIcon className="h-4 w-4" />
      </Badge>
      <Badge className="rounded-full pr-1 gap-1.5">
        {t('remove')}
        <XIcon className="h-4 w-4" />
      </Badge>
    </div>
  );
}
