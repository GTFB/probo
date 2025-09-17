'use client';

import { ComponentsHeader } from "@/components/shared/components-header";
import { ToTopButton } from "@/components/shared/to-top-button";
import { Card, CardContent } from "@/components/ui/card";
import { PROJECT_SETTINGS } from "../../../../settings";
import { useTranslations } from "next-intl";
import { cardStyles } from "@/lib/button-styles";
import {
  InputDefault,
  InputWithRing,
  InputFilled,
  InputDisabled,
  InputWithLabel,
  InputWithButton,
  InputWithAdornment,
  InputWithHelperText,
  InputWithError,
  InputWithForm,
  InputFile,
  InputDropzone,
} from "@/components/widgets/input";

export default function InputComponentsPage() {
  const t = useTranslations('input');

  const demoSections = [
    {
      title: t('variants.default.title'),
      description: t('variants.default.description'),
      component: <InputDefault />
    },
    {
      title: t('variants.withRing.title'),
      description: t('variants.withRing.description'),
      component: <InputWithRing />
    },
    {
      title: t('variants.filled.title'),
      description: t('variants.filled.description'),
      component: <InputFilled />
    },
    {
      title: t('variants.disabled.title'),
      description: t('variants.disabled.description'),
      component: <InputDisabled />
    },
    {
      title: t('variants.withLabel.title'),
      description: t('variants.withLabel.description'),
      component: <InputWithLabel />
    },
    {
      title: t('variants.withButton.title'),
      description: t('variants.withButton.description'),
      component: <InputWithButton />
    },
    {
      title: t('variants.withAdornment.title'),
      description: t('variants.withAdornment.description'),
      component: <InputWithAdornment />
    },
    {
      title: t('variants.withHelperText.title'),
      description: t('variants.withHelperText.description'),
      component: <InputWithHelperText />
    },
    {
      title: t('variants.withError.title'),
      description: t('variants.withError.description'),
      component: <InputWithError />
    },
    {
      title: t('variants.withForm.title'),
      description: t('variants.withForm.description'),
      component: <InputWithForm />
    },
    {
      title: t('variants.file.title'),
      description: t('variants.file.description'),
      component: <InputFile />
    },
    {
      title: t('variants.dropzone.title'),
      description: t('variants.dropzone.description'),
      component: <InputDropzone />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ComponentsHeader
        title={t('title')}
        showBackButton={true}
        backHref="/components"
        badges={[]}
      />
      
      <div className={`mx-auto py-8 space-y-12 max-w-7xl ${PROJECT_SETTINGS.mobilePadding}`}>
        {/* Description Section */}
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>

        {demoSections.map((section, index) => (
          <div key={index} className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{section.title}</h3>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
            <div className="w-full">
              {section.component}
            </div>
          </div>
        ))}

        {/* Usage Section */}
        <Card className={`mt-12 ${cardStyles.info}`}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4 sm:flex-row sm:items-center sm:text-left sm:space-y-0 sm:space-x-4">
              <div className="h-6 w-6 text-secondary-foreground flex-shrink-0">ℹ️</div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('usage.title')}</h3>
                <p className="text-sm text-secondary-foreground">
                  {t('usage.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ToTopButton />
    </div>
  );
}
