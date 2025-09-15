import { Card, CardContent } from "@/components/ui/card";
import { ComponentsHeader } from "@/components/shared/components-header";
import { ToTopButton } from "@/components/shared/to-top-button";
import { PROJECT_SETTINGS } from "../../../../settings";
import { useTranslations } from "next-intl";
import { Code } from "lucide-react";
import AccordionDemo from "@/components/demo/accordion/accordion";
import AccordionOutlineDemo from "@/components/demo/accordion/accordion-outline";
import AccordionBoxDemo from "@/components/demo/accordion/accordion-box";
import AccordionContainedDemo from "@/components/demo/accordion/accordion-contained";
import AccordionBoxContainedDemo from "@/components/demo/accordion/accordion-box-contained";
import AccordionTabsDemo from "@/components/demo/accordion/accordion-tabs";
import AccordionHighlightActiveDemo from "@/components/demo/accordion/accordion-highlight-active";
import AccordionMultipleDemo from "@/components/demo/accordion/accordion-multiple";
import AccordionExpandIconDemo from "@/components/demo/accordion/accordion-expand-icon";
import AccordionIconDemo from "@/components/demo/accordion/accordion-icon";
import AccordionMediaContentDemo from "@/components/demo/accordion/accordion-media-content";
import AccordionDisabledDemo from "@/components/demo/accordion/accordion-disabled";

export default function AccordionPage() {
  const t = useTranslations('accordion');

  const demoSections = [
    {
      title: t('variants.default.title'),
      description: t('variants.default.description'),
      component: <AccordionDemo />
    },
    {
      title: t('variants.outline.title'),
      description: t('variants.outline.description'),
      component: <AccordionOutlineDemo />
    },
    {
      title: t('variants.box.title'),
      description: t('variants.box.description'),
      component: <AccordionBoxDemo />
    },
    {
      title: t('variants.contained.title'),
      description: t('variants.contained.description'),
      component: <AccordionContainedDemo />
    },
    {
      title: t('variants.boxContained.title'),
      description: t('variants.boxContained.description'),
      component: <AccordionBoxContainedDemo />
    },
    {
      title: t('variants.tabs.title'),
      description: t('variants.tabs.description'),
      component: <AccordionTabsDemo />
    },
    {
      title: t('variants.highlightActive.title'),
      description: t('variants.highlightActive.description'),
      component: <AccordionHighlightActiveDemo />
    },
    {
      title: t('variants.multiple.title'),
      description: t('variants.multiple.description'),
      component: <AccordionMultipleDemo />
    },
    {
      title: t('variants.expandIcon.title'),
      description: t('variants.expandIcon.description'),
      component: <AccordionExpandIconDemo />
    },
    {
      title: t('variants.icon.title'),
      description: t('variants.icon.description'),
      component: <AccordionIconDemo />
    },
    {
      title: t('variants.mediaContent.title'),
      description: t('variants.mediaContent.description'),
      component: <AccordionMediaContentDemo />
    },
    {
      title: t('variants.disabled.title'),
      description: t('variants.disabled.description'),
      component: <AccordionDisabledDemo />
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
        <Card className="mt-12 info-card">
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