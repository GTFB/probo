import { Button } from "@/components/ui/button";
import { Download, Heart, Share2 } from "lucide-react";

export default function ButtonDemo() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🚀</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" size="sm">
          <Heart className="mr-2 h-4 w-4" />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
