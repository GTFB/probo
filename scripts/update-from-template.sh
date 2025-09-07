#!/bin/bash

# Скрипт для обновления проекта из шаблона probo
# Используется для получения последних изменений из upstream

set -e

echo "🔄 Обновление проекта из шаблона probo..."

# Проверяем, что мы в Git репозитории
if [ ! -d ".git" ]; then
    echo "❌ Ошибка: Это не Git репозиторий"
    exit 1
fi

# Проверяем наличие upstream
if ! git remote get-url upstream &> /dev/null; then
    echo "❌ Ошибка: Upstream не настроен"
    echo "💡 Выполните: git remote add upstream https://github.com/GTFB/probo.git"
    exit 1
fi

# Сохраняем текущую ветку
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Текущая ветка: $CURRENT_BRANCH"

# Переключаемся на ветку update-from-template или создаем её
if git show-ref --verify --quiet refs/heads/update-from-template; then
    echo "🌿 Переключение на ветку update-from-template..."
    git checkout update-from-template
else
    echo "🌿 Создание ветки update-from-template..."
    git checkout -b update-from-template
fi

# Получаем последние изменения из шаблона
echo "📥 Получение изменений из upstream..."
git fetch upstream

# Мержим изменения из upstream/main
echo "🔀 Слияние изменений из upstream/main..."
git merge upstream/main

# Отправляем обновления в origin
echo "📤 Отправка обновлений в origin..."
git push origin update-from-template

# Возвращаемся на исходную ветку
echo "↩️  Возвращение на ветку $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

echo ""
echo "✅ Обновление завершено!"
echo ""
echo "📋 Следующие шаги:"
echo "   1. Проверьте изменения: git diff main update-from-template"
echo "   2. Создайте PR из update-from-template в main"
echo "   3. После одобрения мержите PR"
echo ""
echo "🔍 Для просмотра изменений:"
echo "   git log main..update-from-template --oneline"
