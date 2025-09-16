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
      title: t('components.default.title'),
      description: t('components.default.description'),
      component: <InputDefault />
    },
    {
      title: t('components.withRing.title'),
      description: t('components.withRing.description'),
      component: <InputWithRing />
    },
    {
      title: t('components.filled.title'),
      description: t('components.filled.description'),
      component: <InputFilled />
    },
    {
      title: t('components.disabled.title'),
      description: t('components.disabled.description'),
      component: <InputDisabled />
    },
    {
      title: t('components.withLabel.title'),
      description: t('components.withLabel.description'),
      component: <InputWithLabel />
    },
    {
      title: t('components.withButton.title'),
      description: t('components.withButton.description'),
      component: <InputWithButton />
    },
    {
      title: t('components.withAdornment.title'),
      description: t('components.withAdornment.description'),
      component: <InputWithAdornment />
    },
    {
      title: t('components.withHelperText.title'),
      description: t('components.withHelperText.description'),
      component: <InputWithHelperText />
    },
    {
      title: t('components.withError.title'),
      description: t('components.withError.description'),
      component: <InputWithError />
    },
    {
      title: t('components.withForm.title'),
      description: t('components.withForm.description'),
      component: <InputWithForm />
    },
    {
      title: t('components.file.title'),
      description: t('components.file.description'),
      component: <InputFile />
    },
    {
      title: t('components.dropzone.title'),
      description: t('components.dropzone.description'),
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
