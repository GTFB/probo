'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

export default function RadioColor() {
  const t = useTranslations('widgets.radio.items');

  return (
    <RadioGroup defaultValue="indigo" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="green"
          id="color-green"
          className="text-green-500 border-green-500 [&_svg]:fill-green-500"
        />
        <Label htmlFor="color-green">{t('green')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="indigo"
          id="color-indigo"
          className="text-indigo-500 border-indigo-500 [&_svg]:fill-indigo-500"
        />
        <Label htmlFor="color-indigo">{t('indigo')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="rose"
          id="color-rose"
          className="text-rose-500 border-rose-500 [&_svg]:fill-rose-500"
        />
        <Label htmlFor="color-rose">{t('rose')}</Label>
      </div>
    </RadioGroup>
  );
}
