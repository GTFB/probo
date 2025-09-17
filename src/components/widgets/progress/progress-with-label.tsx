'use client';

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressWithLabel() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex items-center gap-3">
      <Progress value={progress} className="flex-1" />
      <span className="text-sm">{progress}%</span>
    </div>
  );
}
