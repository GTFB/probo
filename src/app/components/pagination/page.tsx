'use client';

import { ComponentsHeader } from '@/components/shared/components-header';
import { ToTopButton } from '@/components/shared/to-top-button';
import { Card, CardContent } from '@/components/ui/card';
import { PROJECT_SETTINGS } from '../../../../settings';
import { useTranslations } from 'next-intl';
import { cardStyles } from '@/lib/button-styles';
import {
  PaginationDefault,
  PaginationPrimary,
  PaginationSecondary,
  PaginationRounded,
  PaginationWithIcon,
  PaginationFirstLast,
  PaginationBordered,
  PaginationTabs,
  PaginationTabsSecondary,
  PaginationWithIconLabel,
  PaginationNumberless,
  PaginationNumberlessText,
  PaginationWithEllipsis,
  PaginationTable
} from "@/components/widgets/pagination";

export default function PaginationPage() {
  const t = useTranslations('pagination');

  const demoSections = [
    {
      title: t('variants.default.title'),
      description: t('variants.default.description'),
      component: <PaginationDefault />
    },
    {
      title: t('variants.primary.title'),
      description: t('variants.primary.description'),
      component: <PaginationPrimary />
    },
    {
      title: t('variants.secondary.title'),
      description: t('variants.secondary.description'),
      component: <PaginationSecondary />
    },
    {
      title: t('variants.rounded.title'),
      description: t('variants.rounded.description'),
      component: <PaginationRounded />
    },
    {
      title: t('variants.withIcon.title'),
      description: t('variants.withIcon.description'),
      component: <PaginationWithIcon />
    },
    {
      title: t('variants.firstLast.title'),
      description: t('variants.firstLast.description'),
      component: <PaginationFirstLast />
    },
    {
      title: t('variants.bordered.title'),
      description: t('variants.bordered.description'),
      component: <PaginationBordered />
    },
    {
      title: t('variants.tabs.title'),
      description: t('variants.tabs.description'),
      component: <PaginationTabs />
    },
    {
      title: t('variants.tabsSecondary.title'),
      description: t('variants.tabsSecondary.description'),
      component: <PaginationTabsSecondary />
    },
    {
      title: t('variants.withIconLabel.title'),
      description: t('variants.withIconLabel.description'),
      component: <PaginationWithIconLabel />
    },
    {
      title: t('variants.numberless.title'),
      description: t('variants.numberless.description'),
      component: <PaginationNumberless />
    },
    {
      title: t('variants.numberlessText.title'),
      description: t('variants.numberlessText.description'),
      component: <PaginationNumberlessText />
    },
    {
      title: t('variants.withEllipsis.title'),
      description: t('variants.withEllipsis.description'),
      component: <PaginationWithEllipsis />
    },
    {
      title: t('variants.table.title'),
      description: t('variants.table.description'),
      component: <PaginationTable />
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
