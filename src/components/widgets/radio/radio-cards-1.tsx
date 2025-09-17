'use client';

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function RadioCards1() {
  const t = useTranslations('widgets.radio.items');
  const [selectedValue, setSelectedValue] = React.useState("4gb");

  const options = [
    {
      value: "4gb",
      label: t('memory4gb'),
    },
    {
      value: "6gb",
      label: t('memory6gb'),
    },
    {
      value: "8gb",
      label: t('memory8gb'),
    },
  ];

  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={setSelectedValue}
      className="max-w-md w-full grid grid-cols-3 gap-3"
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={`ring-[1px] ring-border rounded py-1 px-3 cursor-pointer transition-all ${
            selectedValue === option.value 
              ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
              : 'hover:ring-blue-300'
          }`}
          onClick={() => setSelectedValue(option.value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value} className="font-semibold tracking-tight cursor-pointer">
              {option.label}
            </Label>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
