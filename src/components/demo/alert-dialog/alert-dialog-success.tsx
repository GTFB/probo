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
import { CircleCheckBig } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AlertDialogSuccessDemo() {
  const t = useTranslations('demo.alertDialog.items');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50 border-2">
          {t('success.trigger')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <CircleCheckBig className="h-5 w-5 text-green-500" />
            {t('success.title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            {t('success.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('success.cancel')}</AlertDialogCancel>
          <AlertDialogAction className="bg-green-500 text-white hover:bg-green-600">
            {t('success.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
