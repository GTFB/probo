import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

export default function AlertDialogScrollableDemo() {
  const t = useTranslations('demo.alertDialog.items');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-border">{t('scrollable.trigger')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('scrollable.title')}</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            {t('scrollable.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <ScrollArea className="h-48 w-full rounded-md border p-4">
          <div className="space-y-2">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="text-sm">
                {t('scrollable.item', { number: i + 1 })}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <AlertDialogFooter>
          <AlertDialogCancel>{t('scrollable.cancel')}</AlertDialogCancel>
          <AlertDialogAction>{t('scrollable.accept')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
