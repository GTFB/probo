# LanguageSwitcher

Универсальный компонент для переключения языков в приложении.

## Использование

```tsx
import { LanguageSwitcher } from '@/components/language-switcher'

// Основной переключатель (по умолчанию)
<LanguageSwitcher />

// Компактный с текстом
<LanguageSwitcher variant="compact" showText={true} size="sm" />

// Минимальный (только флаг)
<LanguageSwitcher variant="minimal" />

// Инлайн (все языки в ряд)
<LanguageSwitcher variant="inline" showGlobe={true} />
```

## Пропсы

| Проп | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `variant` | `'default' \| 'compact' \| 'minimal' \| 'inline'` | `'default'` | Вариант отображения |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Размер кнопки |
| `showGlobe` | `boolean` | `true` | Показывать иконку глобуса |
| `showText` | `boolean` | `true` | Показывать текст |
| `className` | `string` | `''` | Дополнительные CSS классы |

## Варианты

### `default` - Основной
- Выпадающее меню с флагом и названием
- Адаптивный дизайн (скрывает текст на мобильных)
- Иконка глобуса

### `compact` - Компактный
- Иконка глобуса + опционально флаг
- Настраиваемый размер
- Выпадающее меню

### `minimal` - Минимальный
- Только флаг текущего языка
- Выпадающее меню при клике
- Экономит место

### `inline` - Инлайн
- Все языки в ряд как кнопки
- Быстрый доступ ко всем языкам
- Опциональная иконка глобуса

## Поддерживаемые языки

- 🇺🇸 English (EN)
- 🇷🇺 Русский (RU)
- 🇪🇸 Español (ES)
- 🇫🇷 Français (FR)
- 🇩🇪 Deutsch (DE)
- 🇮🇹 Italiano (IT)
- 🇵🇹 Português (PT)
- 🇯🇵 日本語 (JP)
- 🇰🇷 한국어 (KR)
- 🇨🇳 中文 (CN)
- 🇸🇦 العربية (AR)
- 🇮🇳 हिन्दी (IN)

## Примеры использования

### В хедере
```tsx
<LanguageSwitcher />
```

### В сайдбаре
```tsx
<LanguageSwitcher variant="compact" showText={true} size="sm" />
```

### В мобильном меню
```tsx
<LanguageSwitcher variant="inline" showGlobe={false} />
```

### В компактных местах
```tsx
<LanguageSwitcher variant="minimal" />
```
