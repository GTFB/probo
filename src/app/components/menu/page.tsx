'use client';

import { ComponentsHeader } from '@/components/shared/components-header';
import { ToTopButton } from '@/components/shared/to-top-button';
import { Card, CardContent } from '@/components/ui/card';
import { PROJECT_SETTINGS } from '../../../../settings';
import { useTranslations } from 'next-intl';
import { cardStyles } from '@/lib/button-styles';
import {
  MenuDefaultDemo,
  MenuWithIconDemo,
  MenuDropdownDemo,
  MenuActiveItemDemo,
  MenuUnderlinedDemo,
  MenuRichDemo,
  MenuIconDemo,
  MenuMobileDemo
} from "@/components/widgets/menu";

export default function MenuPage() {
  const t = useTranslations('menu');

  const demoSections = [
    {
      title: t('variants.default.title'),
      description: t('variants.default.description'),
      component: <MenuDefaultDemo />
    },
    {
      title: t('variants.withIcon.title'),
      description: t('variants.withIcon.description'),
      component: <MenuWithIconDemo />
    },
    {
      title: t('variants.dropdown.title'),
      description: t('variants.dropdown.description'),
      component: <MenuDropdownDemo />
    },
    {
      title: t('variants.activeItem.title'),
      description: t('variants.activeItem.description'),
      component: <MenuActiveItemDemo />
    },
    {
      title: t('variants.underlined.title'),
      description: t('variants.underlined.description'),
      component: <MenuUnderlinedDemo />
    },
    {
      title: t('variants.rich.title'),
      description: t('variants.rich.description'),
      component: <MenuRichDemo />
    },
    {
      title: t('variants.icon.title'),
      description: t('variants.icon.description'),
      component: <MenuIconDemo />
    },
    {
      title: t('variants.mobile.title'),
      description: t('variants.mobile.description'),
      component: <MenuMobileDemo />
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
