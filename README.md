# Zustand Practice

Проект для практики и изучения Zustand на примере простого task board.

## Технологии

- React
- TypeScript
- Vite
- Zustand
- CSS Modules
- clsx
- Biome

## Команды

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run check
npm run preview
```

- `dev` - запуск проекта в dev-режиме
- `build` - TypeScript-проверка и production-сборка
- `lint` / `check` - проверка Biome
- `format` - форматирование и safe fixes через Biome

## Структура проекта

```text
src/
  components/
    Column/
      Column.tsx
      Column.module.css
    Task/
      Task.tsx
      Task.module.css
    icons/
      Trash.tsx
  lib/
    constants.ts
  types/
    types.ts
  assets/
  App.tsx
  App.css
  index.css
  main.tsx
  store.ts
```

## Что изучается

- создание Zustand store
- actions для добавления, удаления и перемещения задач
- selectors и shallow-сравнение
- persist и devtools middleware
- типизация на TypeScript
- настройка Biome для форматирования и lint rules
