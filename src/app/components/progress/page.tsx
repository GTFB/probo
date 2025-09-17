'use client';

import { ComponentsHeader } from '@/components/shared/components-header';
import { ToTopButton } from '@/components/shared/to-top-button';
import { Card, CardContent } from '@/components/ui/card';
import { PROJECT_SETTINGS } from '../../../../settings';
import { useTranslations } from 'next-intl';
import { cardStyles } from '@/lib/button-styles';
import {
  ProgressDefault,
  ProgressWithLabel,
  ProgressColor,
  ProgressRounded,
  ProgressGradient,
  ProgressAnimation,
  ProgressCircular,
  ProgressCircularWithLabel,
  ProgressCircularCustomLabel,
  ProgressCircularColor,
  ProgressCircularShape,
  ProgressCircularStrokeWidth
} from "@/components/widgets/progress";

export default function ProgressPage() {
  const t = useTranslations('progress');

  const demoSections = [
    {
      title: t('variants.default.title'),
      description: t('variants.default.description'),
      component: <ProgressDefault />
    },
    {
      title: t('variants.withLabel.title'),
      description: t('variants.withLabel.description'),
      component: <ProgressWithLabel />
    },
    {
      title: t('variants.color.title'),
      description: t('variants.color.description'),
      component: <ProgressColor />
    },
    {
      title: t('variants.rounded.title'),
      description: t('variants.rounded.description'),
      component: <ProgressRounded />
    },
    {
      title: t('variants.gradient.title'),
      description: t('variants.gradient.description'),
      component: <ProgressGradient />
    },
    {
      title: t('variants.animation.title'),
      description: t('variants.animation.description'),
      component: <ProgressAnimation />
    },
    {
      title: t('variants.circular.title'),
      description: t('variants.circular.description'),
      component: <ProgressCircular />
    },
    {
      title: t('variants.circularWithLabel.title'),
      description: t('variants.circularWithLabel.description'),
      component: <ProgressCircularWithLabel />
    },
    {
      title: t('variants.circularCustomLabel.title'),
      description: t('variants.circularCustomLabel.description'),
      component: <ProgressCircularCustomLabel />
    },
    {
      title: t('variants.circularColor.title'),
      description: t('variants.circularColor.description'),
      component: <ProgressCircularColor />
    },
    {
      title: t('variants.circularShape.title'),
      description: t('variants.circularShape.description'),
      component: <ProgressCircularShape />
    },
    {
      title: t('variants.circularStrokeWidth.title'),
      description: t('variants.circularStrokeWidth.description'),
      component: <ProgressCircularStrokeWidth />
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
