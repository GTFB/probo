'use client';

import { ComponentsHeader } from '@/components/shared/components-header';
import { ToTopButton } from '@/components/shared/to-top-button';
import { Card, CardContent } from '@/components/ui/card';
import { PROJECT_SETTINGS } from '../../../../settings';
import { useTranslations } from 'next-intl';
import { cardStyles } from '@/lib/button-styles';
import {
  RadioDefault,
  RadioHorizontal,
  RadioDisabled,
  RadioColor,
  RadioSize,
  RadioVariant,
  RadioCards1,
  RadioCards2,
  RadioCards3
} from "@/components/widgets/radio";

export default function RadioPage() {
  const t = useTranslations('radio');

  const demoSections = [
    {
      title: t('variants.default.title'),
      description: t('variants.default.description'),
      component: <RadioDefault />
    },
    {
      title: t('variants.horizontal.title'),
      description: t('variants.horizontal.description'),
      component: <RadioHorizontal />
    },
    {
      title: t('variants.disabled.title'),
      description: t('variants.disabled.description'),
      component: <RadioDisabled />
    },
    {
      title: t('variants.color.title'),
      description: t('variants.color.description'),
      component: <RadioColor />
    },
    {
      title: t('variants.size.title'),
      description: t('variants.size.description'),
      component: <RadioSize />
    },
    {
      title: t('variants.variant.title'),
      description: t('variants.variant.description'),
      component: <RadioVariant />
    },
    {
      title: t('variants.cards1.title'),
      description: t('variants.cards1.description'),
      component: <RadioCards1 />
    },
    {
      title: t('variants.cards2.title'),
      description: t('variants.cards2.description'),
      component: <RadioCards2 />
    },
    {
      title: t('variants.cards3.title'),
      description: t('variants.cards3.description'),
      component: <RadioCards3 />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ComponentsHeader
        title={t('title')}
        description=""
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
