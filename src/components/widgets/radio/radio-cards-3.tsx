'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";

export default function RadioCards3() {
  const t = useTranslations('widgets.radio.items');

  return (
    <Card className="max-w-xs shadow-xs">
      <CardHeader>
        <CardTitle>{t('planOptions')}</CardTitle>
        <CardDescription>
          {t('selectPlan')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="standard">
          <div className="flex items-start space-x-2 mb-4">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free" className="flex flex-col items-start">
              <span className="font-semibold">{t('free')}</span>
              <span className="text-sm text-muted-foreground">
                {t('freeDescription')}
              </span>
            </Label>
          </div>
          <div className="flex items-start space-x-2 mb-4">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard" className="flex flex-col items-start">
              <span className="font-semibold">{t('standard')}</span>
              <span className="text-sm text-muted-foreground">
                {t('standardDescription')}
              </span>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="premium" id="premium" />
            <Label htmlFor="premium" className="flex flex-col items-start">
              <span className="font-semibold">{t('premium')}</span>
              <span className="text-sm text-muted-foreground">
                {t('premiumDescription')}
              </span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
