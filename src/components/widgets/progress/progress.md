## Default

"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}

## Linear with label

"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export default function LinearProgressWithLabelDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex items-center justify-center gap-3">
      <Progress value={progress} className="w-[60%]" />
      <span className="text-sm">{progress}%</span>
    </div>
  );
}

## Linear color

"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export default function ProgressColorDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <Progress value={progress} className="w-[60%] [&>div]:bg-green-500" />
      <Progress value={progress} className="w-[60%] [&>div]:bg-indigo-500" />
      <Progress value={progress} className="w-[60%] [&>div]:bg-rose-500" />
    </div>
  );
}

## Rounded progress indicator

"use client";

import { Progress } from "@/components/ui/progress";
import * as React from "react";

export default function RoundedLinearProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress value={progress} className="w-[60%] [&>div]:rounded-r-full" />
  );
}

## Gradient

"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export default function ProgressGradientDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress
      value={progress}
      className="w-[60%] [&>div]:bg-linear-to-r [&>div]:from-cyan-400 [&>div]:via-sky-500 [&>div]:to-indigo-500 [&>div]:rounded-l-full"
    />
  );
}

## Animation

"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import * as React from "react";

export default function ProgressAnimationDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-[60%]">
      <style>
        {`@keyframes progress {
            to {
              left: calc(100% - 2rem);
            }
          }
          .progress {
            transform-origin: center;
            animation: progress 1.25s ease-in-out infinite;
          }
          `}
      </style>
      <ProgressPrimitive.Root className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
        <ProgressPrimitive.Indicator
          className="relative h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
        >
          <div className="absolute left-0 w-6 h-full bg-primary-foreground blur-[10px] inset-y-0 progress" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  );
}

## Circular

"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn("stroke-primary", progressClassName)}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

export default function CircularProgressDemo() {
  const [progress, setProgress] = React.useState([13]);

  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <CircularProgress value={progress[0]} size={120} strokeWidth={10} />
      <Slider
        defaultValue={progress}
        max={100}
        step={1}
        onValueChange={setProgress}
        className="mt-6"
      />
    </div>
  );
}

## Circular with label

"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn("stroke-primary", progressClassName)}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

export default function CircularProgressWithLabelDemo() {
  const [progress, setProgress] = React.useState([13]);

  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <CircularProgress
        value={progress[0]}
        size={120}
        strokeWidth={10}
        showLabel
        labelClassName="text-xl font-bold"
      />
      <Slider
        defaultValue={progress}
        max={100}
        step={1}
        onValueChange={setProgress}
        className="mt-6"
      />
    </div>
  );
}

## Circular with custom label

"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn("stroke-primary", progressClassName)}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

export default function CircularProgressWithCustomLabelDemo() {
  const [progress, setProgress] = React.useState([13]);

  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <CircularProgress
        value={progress[0]}
        size={120}
        strokeWidth={10}
        showLabel
        labelClassName="text-xl font-bold"
        renderLabel={(progress) => `${progress}%`}
      />
      <Slider
        defaultValue={progress}
        max={100}
        step={1}
        onValueChange={setProgress}
        className="mt-6"
      />
    </div>
  );
}

## Circular color

"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn("stroke-primary", progressClassName)}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

export default function CircularProgressColorDemo() {
  const [progress, setProgress] = React.useState([13]);

  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <div className="flex items-center gap-1">
        <CircularProgress
          value={progress[0]}
          size={120}
          strokeWidth={10}
          showLabel
          labelClassName="text-xl font-bold"
          renderLabel={(progress) => `${progress}%`}
          className="stroke-indigo-500/25"
          progressClassName="stroke-indigo-600"
        />
        <CircularProgress
          value={progress[0]}
          size={120}
          strokeWidth={10}
          showLabel
          labelClassName="text-xl font-bold"
          renderLabel={(progress) => `${progress}%`}
          className="stroke-orange-500/25"
          progressClassName="stroke-orange-600"
        />
      </div>
      <Slider
        defaultValue={progress}
        max={100}
        step={1}
        onValueChange={setProgress}
        className="mt-6"
      />
    </div>
  );
}

## Circular progress shape

"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn("stroke-primary", progressClassName)}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

export default function CircularProgressShapeDemo() {
  const [progress, setProgress] = React.useState([13]);

  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <div className="flex items-center gap-1">
        <CircularProgress
          value={progress[0]}
          size={120}
          strokeWidth={10}
          showLabel
          labelClassName="text-xl font-bold"
          renderLabel={(progress) => `${progress}%`}
          shape="round"
        />
        <CircularProgress
          value={progress[0]}
          size={120}
          strokeWidth={10}
          showLabel
          labelClassName="text-xl font-bold"
          renderLabel={(progress) => `${progress}%`}
          shape="square"
        />
      </div>
      <Slider
        defaultValue={progress}
        max={100}
        step={1}
        onValueChange={setProgress}
        className="mt-6"
      />
    </div>
  );
}

## Circular stroke width

"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn("stroke-primary", progressClassName)}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

export default function CircularProgressStrokeWidthDemo() {
  const [progress, setProgress] = React.useState([13]);

  return (
    <div className="max-w-xs mx-auto w-full flex flex-col items-center">
      <div className="flex items-center gap-1">
        <CircularProgress
          value={progress[0]}
          size={120}
          strokeWidth={10}
          showLabel
          labelClassName="text-xl font-bold"
          renderLabel={(progress) => `${progress}%`}
        />
        <CircularProgress
          value={progress[0]}
          size={120}
          circleStrokeWidth={12}
          progressStrokeWidth={6}
          showLabel
          labelClassName="text-xl font-bold"
          renderLabel={(progress) => `${progress}%`}
        />
        <CircularProgress
          value={progress[0]}
          size={120}
          circleStrokeWidth={6}
          progressStrokeWidth={10}
          showLabel
          labelClassName="text-xl font-bold"
          renderLabel={(progress) => `${progress}%`}
        />
      </div>
      <Slider
        defaultValue={progress}
        max={100}
        step={1}
        onValueChange={setProgress}
        className="mt-6"
      />
    </div>
  );
}
