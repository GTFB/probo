#!/bin/bash

# Скрипт для создания новой feature ветки
# Используется для разработки новых функций

set -e

# Проверяем аргументы
if [ $# -eq 0 ]; then
    echo "❌ Ошибка: Укажите название feature ветки"
    echo "💡 Использование: $0 <feature-name>"
    echo "📝 Пример: $0 user-authentication"
    exit 1
fi

FEATURE_NAME=$1
FEATURE_BRANCH="feature/$FEATURE_NAME"

echo "🌿 Создание feature ветки: $FEATURE_BRANCH"

# Проверяем, что мы в Git репозитории
if [ ! -d ".git" ]; then
    echo "❌ Ошибка: Это не Git репозиторий"
    exit 1
fi

# Проверяем существование ветки
if git show-ref --verify --quiet refs/heads/$FEATURE_BRANCH; then
    echo "⚠️  Ветка $FEATURE_BRANCH уже существует"
    read -p "Переключиться на неё? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout $FEATURE_BRANCH
        echo "✅ Переключились на ветку $FEATURE_BRANCH"
    fi
    exit 0
fi

# Переключаемся на main и обновляем её
echo "📍 Переключение на main..."
git checkout main

echo "🔄 Обновление main из origin..."
git pull origin main

# Создаем новую feature ветку
echo "🌿 Создание ветки $FEATURE_BRANCH..."
git checkout -b $FEATURE_BRANCH

echo ""
echo "✅ Feature ветка создана!"
echo ""
echo "📋 Информация:"
echo "   Ветка: $FEATURE_BRANCH"
echo "   Основана на: main"
echo ""
echo "🔧 Следующие шаги:"
echo "   1. Разработайте функцию"
echo "   2. git add ."
echo "   3. git commit -m 'feat: добавить $FEATURE_NAME'"
echo "   4. git push origin $FEATURE_BRANCH"
echo "   5. Создайте PR в develop"
