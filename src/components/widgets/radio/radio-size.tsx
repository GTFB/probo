'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

export default function RadioSize() {
  const t = useTranslations('widgets.radio.items');

  return (
    <RadioGroup defaultValue="default" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="size-default" />
        <Label htmlFor="size-default">{t('default')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="medium"
          className="h-5 w-5 [&_svg]:h-3.5 [&_svg]:w-3.5"
          id="size-medium"
        />
        <Label htmlFor="size-medium">{t('medium')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="big"
          className="h-6 w-6 [&_svg]:h-4 [&_svg]:w-4"
          id="size-large"
        />
        <Label htmlFor="size-large">{t('large')}</Label>
      </div>
    </RadioGroup>
  );
}
