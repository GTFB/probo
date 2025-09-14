import { Card, CardContent } from "@/components/ui/card";
import { ComponentsHeader } from "@/components/shared/components-header";
import { PROJECT_SETTINGS } from "../../../../settings";
import { useTranslations } from "next-intl";
import { Code } from "lucide-react";
import AccordionDemo from "@/components/demo/accordion/accordion";
import AccordionOutlineDemo from "@/components/demo/accordion/accordion-outline";
import AccordionBoxDemo from "@/components/demo/accordion/accordion-box";
import AccordionBoxContainedDemo from "@/components/demo/accordion/accordion-box-contained";
import AccordionTabsDemo from "@/components/demo/accordion/accordion-tabs";
import AccordionCustomTriggerDemo from "@/components/demo/accordion/accordion-custom-trigger";
import AccordionDisabledDemo from "@/components/demo/accordion/accordion-disabled";
import AccordionHighlightActiveDemo from "@/components/demo/accordion/accordion-highlight-active";
import AccordionMediaContentDemo from "@/components/demo/accordion/accordion-media-content";

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
      title: t('variants.customTrigger.title'),
      description: t('variants.customTrigger.description'),
      component: <AccordionCustomTriggerDemo />
    },
    {
      title: t('variants.disabled.title'),
      description: t('variants.disabled.description'),
      component: <AccordionDisabledDemo />
    },
    {
      title: t('variants.highlightActive.title'),
      description: t('variants.highlightActive.description'),
      component: <AccordionHighlightActiveDemo />
    },
    {
      title: t('variants.mediaContent.title'),
      description: t('variants.mediaContent.description'),
      component: <AccordionMediaContentDemo />
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
      
      <div className={`container mx-auto py-8 space-y-12 ${PROJECT_SETTINGS.containerWidth} ${PROJECT_SETTINGS.mobilePadding}`}>
        {/* Description Section */}
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
        <Card className="mt-12 bg-muted/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4 sm:flex-row sm:items-center sm:text-left sm:space-y-0 sm:space-x-4">
              <Code className="h-6 w-6 text-muted-foreground flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('usage.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('usage.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}