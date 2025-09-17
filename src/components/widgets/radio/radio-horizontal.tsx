'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

export default function RadioHorizontal() {
  const t = useTranslations('widgets.radio.items');

  return (
    <RadioGroup defaultValue="comfortable" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1-horizontal" />
        <Label htmlFor="r1-horizontal">{t('default')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2-horizontal" />
        <Label htmlFor="r2-horizontal">{t('comfortable')}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3-horizontal" />
        <Label htmlFor="r3-horizontal">{t('compact')}</Label>
      </div>
    </RadioGroup>
  );
}
