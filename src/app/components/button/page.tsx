import { ButtonDemo } from "@/components/demo/basic";
import ComponentLayout from "@/components/demo/layout/component-layout";
import VariantDemo from "@/components/demo/layout/variant-demo";
import DemoGrid from "@/components/demo/layout/demo-grid";

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
