import { ButtonDemo } from "@/components/widgets/basic";
import ComponentLayout from "@/components/widgets/layout/component-layout";
import VariantDemo from "@/components/widgets/layout/variant-demo";
import DemoGrid from "@/components/widgets/layout/widgets-grid";

export default function ButtonPage() {
  const codeExample = `import { Button } from "@/components/ui/button";

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>`;

  return (
    <div className="container mx-auto py-8">
      <ComponentLayout
        title="Button Component"
        description="Displays a button or a component that looks like a button."
        showCodeExample={true}
        codeExample={codeExample}
      >
        <DemoGrid columns={1}>
          <VariantDemo
            title="All Variants"
            description="Different button styles and sizes with icons."
          >
            <ButtonDemo />
          </VariantDemo>
        </DemoGrid>
      </ComponentLayout>
    </div>
  );
}
