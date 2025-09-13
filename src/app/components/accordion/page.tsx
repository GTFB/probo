import { 
  AccordionDemo,
  AccordionOutlineDemo,
  AccordionBoxDemo,
  AccordionBoxContainedDemo,
  AccordionTabsDemo,
  AccordionHighlightActiveDemo,
  AccordionCustomTriggerDemo,
  AccordionMediaContentDemo,
  AccordionDisabledDemo,
  ComponentLayout,
  VariantDemo,
  DemoGrid,
  CodeExample
} from "@/components/demo";

export default function AccordionPage() {
  const codeExample = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

  return (
    <div className="container mx-auto py-8 space-y-12">
      <ComponentLayout
        title="Accordion Component"
        description="A vertically stacked set of interactive headings that each reveal a section of content."
      >
        <DemoGrid columns={1}>
          <VariantDemo
            title="Default"
            description="Basic accordion with default styling."
          >
            <AccordionDemo />
          </VariantDemo>

          <VariantDemo
            title="Outline"
            description="Accordion with outline borders around each item."
          >
            <AccordionOutlineDemo />
          </VariantDemo>

          <VariantDemo
            title="Box"
            description="Accordion items styled as connected boxes."
          >
            <AccordionBoxDemo />
          </VariantDemo>

          <VariantDemo
            title="Box Contained"
            description="Accordion with contained styling and background color."
          >
            <AccordionBoxContainedDemo />
          </VariantDemo>

          <VariantDemo
            title="Tabs Style"
            description="Accordion styled to look like tabs with active state highlighting."
          >
            <AccordionTabsDemo />
          </VariantDemo>

          <VariantDemo
            title="Highlight Active"
            description="Accordion with highlighted active item using colored borders and text."
          >
            <AccordionHighlightActiveDemo />
          </VariantDemo>

          <VariantDemo
            title="Custom Trigger"
            description="Accordion with custom trigger using Plus icon that rotates on open."
          >
            <AccordionCustomTriggerDemo />
          </VariantDemo>

          <VariantDemo
            title="Media Content"
            description="Accordion with icons and media content in the accordion items."
          >
            <AccordionMediaContentDemo />
          </VariantDemo>

          <VariantDemo
            title="Disabled Items"
            description="Accordion with some disabled items that cannot be opened."
          >
            <AccordionDisabledDemo />
          </VariantDemo>
        </DemoGrid>
      </ComponentLayout>

      {/* Usage Example */}
      <CodeExample>{codeExample}</CodeExample>
    </div>
  );
}
