# Demo Components

This directory contains demo components organized by category for better maintainability and discoverability.

## Structure

```
demo/
├── accordion/          # Accordion component demos
│   ├── accordion-demo.tsx
│   ├── accordion-demos.tsx
│   ├── accordion-box-demo.tsx
│   ├── accordion-box-contained-demo.tsx
│   ├── accordion-custom-trigger-demo.tsx
│   ├── accordion-disabled-demo.tsx
│   ├── accordion-highlight-active-demo.tsx
│   ├── accordion-media-content-demo.tsx
│   ├── accordion-outline-demo.tsx
│   ├── accordion-tabs-demo.tsx
│   └── index.tsx
├── basic/              # Basic UI component demos
│   ├── alert-demo.tsx
│   ├── alert-dialog-demo.tsx
│   ├── avatar-demo.tsx
│   ├── badge-demo.tsx
│   ├── button-demo.tsx
│   └── index.tsx
├── layout/             # Layout and utility component demos
│   ├── code-example.tsx
│   ├── component-layout.tsx
│   ├── demo-grid.tsx
│   ├── inline-code-example.tsx
│   ├── variant-demo.tsx
│   └── index.tsx
├── index.tsx           # Main export file
└── README.md           # This file
```

## Usage

### Import specific demo components:
```tsx
import { AlertDemo, ButtonDemo } from '@/components/demo';
import { AccordionDemo } from '@/components/demo/accordion';
import { ComponentLayout } from '@/components/demo/layout';
```

### Import all demos from a category:
```tsx
import * as AccordionDemos from '@/components/demo/accordion';
import * as BasicDemos from '@/components/demo/basic';
import * as LayoutDemos from '@/components/demo/layout';
```

## Categories

### Accordion Demos
- Various accordion component variations and configurations
- Includes box styles, custom triggers, disabled states, and more

### Basic Demos
- Core UI component demonstrations
- Alert, AlertDialog, Avatar, Badge, Button components

### Layout Demos
- Layout and utility components
- Code examples, demo grids, component layouts, and variant demonstrations

## Adding New Demos

1. Create your demo component in the appropriate category folder
2. Export it from the category's `index.tsx` file
3. The main `index.tsx` will automatically re-export it
4. Update this README if adding new categories
