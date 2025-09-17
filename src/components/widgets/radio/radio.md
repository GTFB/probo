## Default

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}

## Horizontal

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupOrientationDemo() {
  return (
    <RadioGroup defaultValue="comfortable" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1-horizontal" />
        <Label htmlFor="r1-horizontal">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2-horizontal" />
        <Label htmlFor="r2-horizontal">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3-horizontal" />
        <Label htmlFor="r3-horizontal">Compact</Label>
      </div>
    </RadioGroup>
  );
}

## Disabled

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupOrientationDemo() {
  return (
    <RadioGroup defaultValue="comfortable" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1-horizontal" />
        <Label htmlFor="r1-horizontal">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2-horizontal" />
        <Label htmlFor="r2-horizontal">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3-horizontal" />
        <Label htmlFor="r3-horizontal">Compact</Label>
      </div>
    </RadioGroup>
  );
}

## Color

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupColorDemo() {
  return (
    <RadioGroup defaultValue="indigo" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="green"
          id="color-green"
          className="text-green-500 border-green-500 [&_svg]:fill-green-500"
        />
        <Label htmlFor="color-green">Green</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="indigo"
          id="color-indigo"
          className="text-indigo-500 border-indigo-500 [&_svg]:fill-indigo-500"
        />
        <Label htmlFor="color-indigo">Indigo</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="rose"
          id="color-rose"
          className="text-rose-500 border-rose-500 [&_svg]:fill-rose-500"
        />
        <Label htmlFor="color-rose">Rose</Label>
      </div>
    </RadioGroup>
  );
}

## Size

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupSizeDemo() {
  return (
    <RadioGroup defaultValue="default" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="size-default" />
        <Label htmlFor="size-default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="medium"
          className="h-5 w-5 [&_svg]:h-3.5 [&_svg]:w-3.5"
          id="size-medium"
        />
        <Label htmlFor="size-medium">Medium</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="big"
          className="h-6 w-6 [&_svg]:h-4 [&_svg]:w-4"
          id="size-large"
        />
        <Label htmlFor="size-large">Large</Label>
      </div>
    </RadioGroup>
  );
}

## Variant

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupVariantDemo() {
  return (
    <RadioGroup defaultValue="default" className="flex items-center gap-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="default"
          id="variant-default"
          className="text-indigo-500 border-indigo-500 [&_svg]:fill-indigo-500"
        />
        <Label htmlFor="variant-default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="soft"
          id="variant-soft"
          className="text-indigo-500 border-indigo-500 [&_svg]:fill-indigo-500 border-none bg-indigo-500/25 dark:bg-indigo-500/30"
        />
        <Label htmlFor="variant-soft">Soft</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="solid"
          id="variant-solid"
          className="text-indigo-500 border-indigo-500 border-none bg-indigo-500 dark:bg-indigo-500 [&_svg]:fill-white"
        />
        <Label htmlFor="variant-solid">Solid</Label>
      </div>
    </RadioGroup>
  );
}

## Cards 1

import React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

const options = [
  {
    value: "4gb",
    label: "4GB + 64GB",
  },
  {
    value: "6gb",
    label: "6GB + 128GB",
  },
  {
    value: "8gb",
    label: "8GB + 128GB",
  },
];

const RadioCardsDemo = () => {
  return (
    <RadioGroupPrimitive.Root
      defaultValue={options[0].value}
      className="max-w-md w-full grid grid-cols-3 gap-3"
    >
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className="ring-[1px] ring-border rounded py-1 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
        >
          <span className="font-semibold tracking-tight">{option.label}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
};

export default RadioCardsDemo;

## Cards 2

import React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { CircleCheck, CpuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  {
    value: "4-core",
    label: "4-core CPU",
    description: "32 GB RAM",
  },
  {
    value: "6-core",
    label: "6-core CPU",
    description: "32 GB RAM",
  },
  {
    value: "8-core",
    label: "8-core CPU",
    description: "32 GB RAM",
  },
];

const RadioCardsDemo = () => {
  return (
    <RadioGroupPrimitive.Root
      defaultValue={options[0].value}
      className="max-w-md w-full grid grid-cols-3 gap-4"
    >
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            "relative group ring-[1px] ring-border rounded py-2 px-3 text-start",
            "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
          )}
        >
          <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white group-data-[state=unchecked]:hidden" />

          <CpuIcon className="mb-2.5 text-muted-foreground" />
          <span className="font-semibold tracking-tight">{option.label}</span>
          <p className="text-xs">{option.description}</p>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
};

export default RadioCardsDemo;

## Cards 3

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioCardsDemo = () => {
  return (
    <Card className="max-w-xs shadow-xs">
      <CardHeader>
        <CardTitle>Plan Options</CardTitle>
        <CardDescription>
          Select your preferred subscription plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="standard">
          <div className="flex items-start space-x-2 mb-4">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free" className="flex flex-col items-start">
              <span className="font-semibold">Free</span>
              <span className="text-sm text-muted-foreground">
                Basic features, no cost
              </span>
            </Label>
          </div>
          <div className="flex items-start space-x-2 mb-4">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard" className="flex flex-col items-start">
              <span className="font-semibold">Standard</span>
              <span className="text-sm text-muted-foreground">
                Advanced features, $9.99/month
              </span>
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="premium" id="premium" />
            <Label htmlFor="premium" className="flex flex-col items-start">
              <span className="font-semibold">Premium</span>
              <span className="text-sm text-muted-foreground">
                All features, $19.99/month
              </span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default RadioCardsDemo;
