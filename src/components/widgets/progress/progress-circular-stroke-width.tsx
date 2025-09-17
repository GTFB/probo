'use client';

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import CircularProgress from "./circular-progress";

export default function ProgressCircularStrokeWidth() {
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
