# UI Component Demo Templates

Этот набор компонентов предоставляет шаблоны для создания страниц демонстрации UI компонентов.

## Компоненты

### ComponentLayout
Основной layout для страниц компонентов.

```tsx
import ComponentLayout from "@/components/demo/component-layout";

<ComponentLayout
  title="Component Name"
  description="Description of the component"
  showCodeExample={true}
  codeExample="code string"
>
  {/* Content */}
</ComponentLayout>
```

**Props:**
- `title: string` - заголовок компонента
- `description: string` - описание компонента
- `children: ReactNode` - содержимое страницы
- `className?: string` - дополнительные CSS классы
- `showCodeExample?: boolean` - показывать ли пример кода
- `codeExample?: string` - пример кода для отображения

### VariantDemo
Компонент для демонстрации вариантов использования.

```tsx
import VariantDemo from "@/components/demo/variant-demo";

<VariantDemo
  title="Variant Name"
  description="Description of this variant"
>
  {/* Demo component */}
</VariantDemo>
```

**Props:**
- `title: string` - название варианта
- `description: string` - описание варианта
- `children: ReactNode` - демо-компонент
- `className?: string` - дополнительные CSS классы

### DemoGrid
Сетка для размещения демо-компонентов.

```tsx
import DemoGrid from "@/components/demo/demo-grid";

<DemoGrid columns={2}>
  {/* Demo components */}
</DemoGrid>
```

**Props:**
- `children: ReactNode` - демо-компоненты
- `className?: string` - дополнительные CSS классы
- `columns?: 1 | 2 | 3 | 4` - количество колонок (по умолчанию 1)

## Пример использования

```tsx
import ComponentLayout from "@/components/demo/component-layout";
import VariantDemo from "@/components/demo/variant-demo";
import DemoGrid from "@/components/demo/demo-grid";

export default function MyComponentPage() {
  const codeExample = `import { MyComponent } from "@/components/ui/my-component";

<MyComponent>Hello World</MyComponent>`;

  return (
    <div className="container mx-auto py-8">
      <ComponentLayout
        title="My Component"
        description="Description of my component"
        showCodeExample={true}
        codeExample={codeExample}
      >
        <DemoGrid columns={2}>
          <VariantDemo
            title="Default"
            description="Default variant"
          >
            <MyComponentDemo />
          </VariantDemo>
          
          <VariantDemo
            title="Custom"
            description="Custom variant"
          >
            <MyComponentCustomDemo />
          </VariantDemo>
        </DemoGrid>
      </ComponentLayout>
    </div>
  );
}
```

## Структура файлов

```
src/components/demo/
├── component-layout.tsx    # Основной layout
├── variant-demo.tsx        # Компонент для вариантов
├── demo-grid.tsx          # Сетка для демо
├── accordion-demos.tsx    # Демо для Accordion
├── alert-demo.tsx         # Демо для Alert
├── button-demo.tsx        # Демо для Button
└── index.tsx              # Экспорты
```

## Создание новой страницы компонента

1. Создайте папку в `src/app/components/[component-name]/`
2. Создайте файл `page.tsx`
3. Импортируйте необходимые демо-компоненты
4. Используйте шаблоны для создания страницы
5. Добавьте ссылку на страницу в главное меню
