'use client';

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressColor() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <Progress value={progress} className="w-full [&>div]:bg-green-500" />
      <Progress value={progress} className="w-full [&>div]:bg-indigo-500" />
      <Progress value={progress} className="w-full [&>div]:bg-rose-500" />
    </div>
  );
}
