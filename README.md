# Digital Butler Portfolio

Гибридное портфолио-приложение с позиционированием «Цифровой батлер / IT-помощник».

## Технологии

- **Astro 5.x** — гибридный режим (`output: 'hybrid'`)
- **React 18** — интерактивные компоненты
- **Three.js + React Three Fiber** — 3D-анимация
- **Tailwind CSS** — стилизация
- **OpenAI API** — AI-чат

## Установка

```bash
# Клонировать репозиторий
git clone <your-repo-url>
cd digital-butler-portfolio

# Установить зависимости
npm install

# Создать файл .env и добавить API ключ
cp .env.example .env
# Отредактируйте .env и добавьте ваш OPENAI_API_KEY

# Запустить в режиме разработки
npm run dev

# Собрать для продакшена
npm run build

# Запустить продакшен-сервер
npm run start
```

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

## Структура проекта

```
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── ButlerModel.tsx    # 3D-компонент с торическим узлом
│   │   └── ai/
│   │       ├── ButlerChat.tsx     # AI-чат компонент
│   │       └── ButlerChat.css     # Стили чата
│   ├── layouts/
│   │   └── Layout.astro           # Основной layout
│   ├── pages/
│   │   ├── api/
│   │   │   └── chat.ts            # API эндпоинт для чата
│   │   └── index.astro            # Главная страница
│   └── public/
├── astro.config.mjs
├── tailwind.config.js
├── package.json
└── .env.example
```

## Особенности

- 🎨 **Тёмная тема по умолчанию** — `bg-slate-950`
- 🤖 **AI-чат** — интеграция с OpenAI GPT-4o-mini
- 🎮 **3D-анимация** — интерактивный торический узел с реакцией на ховер
- 📱 **Адаптивность** — мобильная и десктопная версии
- ⚡ **Гибридный режим** — статические страницы + динамический API

## Лицензия

MIT
