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
  AlertDemo,
  AlertDialogDemo,
  AvatarDemo,
  BadgeDemo,
  ButtonDemo
} from "@/components/demo";

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">UI Components Demo</h1>
        <p className="text-muted-foreground text-lg">
          Демонстрация всех компонентов shadcn/ui
        </p>
      </div>

      {/* Accordion Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Accordion</h2>
            <p className="text-muted-foreground">
              A vertically stacked set of interactive headings that each reveal a section of content.
            </p>
          </div>
          <a 
            href="/components/accordion" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View all variants →
          </a>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Default</h3>
            <AccordionDemo />
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Outline</h3>
            <AccordionOutlineDemo />
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Box</h3>
            <AccordionBoxDemo />
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">Alert</h2>
        <p className="text-muted-foreground">
          Displays a callout for user attention.
        </p>
        <AlertDemo />
      </section>

      {/* Alert Dialog Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">Alert Dialog</h2>
        <p className="text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects a response.
        </p>
        <AlertDialogDemo />
      </section>

      {/* Avatar Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">Avatar</h2>
        <p className="text-muted-foreground">
          An image element with a fallback for representing the user.
        </p>
        <AvatarDemo />
      </section>

      {/* Badge Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">Badge</h2>
        <p className="text-muted-foreground">
          Displays a badge or a component that looks like a badge.
        </p>
        <BadgeDemo />
      </section>

      {/* Button Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">Button</h2>
        <p className="text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
        <ButtonDemo />
      </section>
    </div>
  );
}
