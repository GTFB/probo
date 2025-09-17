'use client';

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CircleCheck, CpuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function RadioCards2() {
  const t = useTranslations('widgets.radio.items');
  const [selectedValue, setSelectedValue] = React.useState("4-core");

  const options = [
    {
      value: "4-core",
      label: t('cpu4core'),
      description: t('ram32gb'),
    },
    {
      value: "6-core",
      label: t('cpu6core'),
      description: t('ram32gb'),
    },
    {
      value: "8-core",
      label: t('cpu8core'),
      description: t('ram32gb'),
    },
  ];

  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={setSelectedValue}
      className="max-w-md w-full grid grid-cols-3 gap-4"
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={cn(
            "relative group ring-[1px] ring-border rounded py-2 px-3 text-start cursor-pointer transition-all",
            selectedValue === option.value 
              ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
              : 'hover:ring-blue-300'
          )}
          onClick={() => setSelectedValue(option.value)}
        >
          <CircleCheck className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white ${
            selectedValue === option.value ? 'block' : 'hidden'
          }`} />

          <div className="flex items-start space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <div className="flex-1">
              <CpuIcon className="mb-2.5 text-muted-foreground" />
              <Label htmlFor={option.value} className="font-semibold tracking-tight cursor-pointer block">
                {option.label}
              </Label>
              <p className="text-xs">{option.description}</p>
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
