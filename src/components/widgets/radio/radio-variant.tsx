'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

export default function RadioVariant() {
  const t = useTranslations('widgets.radio.items');

  return (
    <RadioGroup defaultValue="default" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="default"
          id="variant-default"
          className="text-indigo-500 border-indigo-500 [&_svg]:fill-indigo-500"
        />
        <Label htmlFor="variant-default">{t('default')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="soft"
          id="variant-soft"
          className="text-indigo-500 border-indigo-500 [&_svg]:fill-indigo-500 border-none bg-indigo-500/25 dark:bg-indigo-500/30"
        />
        <Label htmlFor="variant-soft">{t('soft')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="solid"
          id="variant-solid"
          className="text-indigo-500 border-indigo-500 border-none bg-indigo-500 dark:bg-indigo-500 [&_svg]:fill-white"
        />
        <Label htmlFor="variant-solid">{t('solid')}</Label>
      </div>
    </RadioGroup>
  );
}
