import { badgeVariants } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function ClickableBadgeDemo() {
  const t = useTranslations('components.badge.variants');

  return (
    <div className="flex items-center space-x-2">
      <button
        className={badgeVariants({
          className: "cursor-pointer select-none focus:ring-offset-1",
        })}
      >
        {t('clickable')}
      </button>
      <button
        className={badgeVariants({
          variant: "secondary",
          className: "cursor-pointer select-none focus:ring-offset-1",
        })}
      >
        {t('secondary')}
      </button>
    </div>
  );
}
