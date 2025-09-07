# Инструкции по настройке репозитория influbalance

## Первоначальная настройка

### 1. Клонирование репозитория

```bash
# Клонировать клиентский репозиторий
git clone https://github.com/GTFB/influbalance.git
cd influbalance
```

### 2. Настройка upstream

```bash
# Добавить шаблон как upstream
git remote add upstream https://github.com/GTFB/probo.git

# Получить все ветки из шаблона
git fetch upstream

# Создать локальную ветку main из upstream/main
git checkout -b main upstream/main

# Отправить в клиентский репозиторий
git push -u origin main
```

### 3. Создание дополнительных веток

```bash
# Создать ветку develop
git checkout -b develop main
git push -u origin develop

# Создать ветку для обновлений
git checkout -b update-from-template main
git push -u origin update-from-template

# Вернуться на main
git checkout main
```

## Альтернативный способ (если репозиторий уже существует)

Если репозиторий influbalance уже существует и нужно получить содержимое из шаблона:

```bash
# 1. Клонировать существующий репозиторий
git clone https://github.com/GTFB/influbalance.git
cd influbalance

# 2. Добавить upstream
git remote add upstream https://github.com/GTFB/probo.git

# 3. Получить содержимое из шаблона
git fetch upstream
git checkout -b main upstream/main

# 4. Отправить в origin
git push -u origin main --force
```

## Проверка настройки

После настройки проверьте:

```bash
# Посмотреть все remote
git remote -v

# Посмотреть ветки
git branch -a

# Посмотреть статус
git status
```

Должно быть:
- `origin` - ваш клиентский репозиторий
- `upstream` - шаблон probo
- Ветка `main` на основе `upstream/main`

## Следующие шаги

1. **Настроить GitHub Actions** - workflow уже создан в `.github/workflows/`
2. **Создать develop ветку** для разработки
3. **Настроить защиту веток** в настройках GitHub репозитория
4. **Начать разработку** используя feature ветки

## Полезные команды

```bash
# Получить обновления из шаблона
./scripts/update-from-template.sh

# Создать новую feature ветку
./scripts/create-feature.sh my-feature-name

# Посмотреть изменения между ветками
git diff main..develop
```

## Структура проекта

После настройки у вас будет:

```
influbalance/
├── .github/workflows/     # GitHub Actions
├── docs/                  # Документация
├── scripts/               # Скрипты автоматизации
├── src/                   # Исходный код
├── public/                # Статические файлы
├── content/               # MDX контент
└── ...                    # Остальные файлы из шаблона
```

## Поддержка

Если возникли проблемы:

1. Проверьте, что upstream настроен правильно
2. Убедитесь, что у вас есть права на запись в репозиторий
3. Проверьте логи GitHub Actions
4. Обратитесь к документации в папке `docs/`
