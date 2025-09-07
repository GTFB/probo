# Процесс работы с шаблоном

Этот документ описывает процесс работы с клиентским репозиторием, созданным на основе шаблона probo.

## Структура веток

### Основные ветки

- **`main`** - основная ветка клиента, синхронизирована с шаблоном
- **`develop`** - ветка разработки клиента
- **`update-from-template`** - ветка для получения обновлений из шаблона

### Feature ветки

- **`feature/*`** - ветки для разработки новых функций
- Создаются от ветки `main`
- Мержатся в `develop` через Pull Request

## Процесс получения обновлений

### Автоматический способ

```bash
# Использовать готовый скрипт
./scripts/update-from-template.sh
```

### Ручной способ

```bash
# 1. Переключиться на ветку обновлений
git checkout update-from-template

# 2. Получить последние изменения из шаблона
git fetch upstream
git merge upstream/main

# 3. Отправить обновления в origin
git push origin update-from-template

# 4. Создать Pull Request из update-from-template в main
```

## Процесс разработки

### Создание новой функции

```bash
# 1. Создать feature ветку
./scripts/create-feature.sh user-authentication

# 2. Разработать функцию
# ... код ...

# 3. Закоммитить изменения
git add .
git commit -m "feat: добавить аутентификацию пользователей"

# 4. Отправить в origin
git push origin feature/user-authentication

# 5. Создать Pull Request в develop
```

### Работа с существующей feature веткой

```bash
# Переключиться на ветку
git checkout feature/user-authentication

# Обновить из main (если нужно)
git checkout main
git pull origin main
git checkout feature/user-authentication
git merge main

# Продолжить разработку...
```

## Процесс деплоя

### Подготовка к релизу

```bash
# 1. Убедиться, что все feature ветки мержены в develop
git checkout develop
git pull origin develop

# 2. Создать release ветку
git checkout -b release/v1.0.0

# 3. Протестировать и исправить баги
# ... тестирование ...

# 4. Создать Pull Request из release в main
```

### Деплой в production

```bash
# 1. После одобрения PR мержить в main
git checkout main
git pull origin main

# 2. Создать тег релиза
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 3. Деплой в production
# ... процесс деплоя ...
```

## Решение конфликтов

### При обновлении из шаблона

Если при слиянии с `upstream/main` возникают конфликты:

```bash
# 1. Разрешить конфликты вручную
git status  # посмотреть конфликтующие файлы
# ... редактировать файлы ...

# 2. Добавить разрешенные файлы
git add <resolved-files>

# 3. Завершить слияние
git commit

# 4. Отправить изменения
git push origin update-from-template
```

### При слиянии feature веток

```bash
# 1. Обновить develop
git checkout develop
git pull origin develop

# 2. Переключиться на feature ветку
git checkout feature/my-feature

# 3. Слить develop
git merge develop

# 4. Разрешить конфликты
# ... редактировать файлы ...

# 5. Завершить слияние
git add .
git commit

# 6. Отправить изменения
git push origin feature/my-feature
```

## Полезные команды

### Просмотр изменений

```bash
# Посмотреть изменения между ветками
git diff main..develop

# Посмотреть коммиты между ветками
git log main..develop --oneline

# Посмотреть изменения в файле
git diff HEAD~1 -- <file>
```

### Работа с remote

```bash
# Посмотреть все remote
git remote -v

# Обновить upstream
git fetch upstream

# Посмотреть ветки upstream
git branch -r
```

### Очистка

```bash
# Удалить локальную ветку
git branch -d feature/old-feature

# Удалить remote ветку
git push origin --delete feature/old-feature

# Очистить неиспользуемые ветки
git remote prune origin
```
