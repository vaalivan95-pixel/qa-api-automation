# QA API Automation

Учебный проект автоматизированного тестирования REST API на JavaScript (Node.js).

## О проекте

Проверки для [JSONPlaceholder](https://jsonplaceholder.typicode.com/):
- GET `/users/3`: HTTP 200, ID, тип имени, email, структура пользователя;
- GET `/users/999999999`: ожидаемый HTTP 404;
- GET `/posts?userId=3`: HTTP 200, массив публикаций, принадлежность пользователю, ID, поля `title`/`body`;
- GET `/posts?userId=999999999`: HTTP 200 и пустой массив.

Всего **12 автоматизированных тестов**.

## Технологии

- JavaScript
- Node.js (встроенные `fetch`, `node:test`, `node:assert/strict`)
- npm
- Git / GitHub

## Структура проекта

```text
qa-api-automation/
├── helpers/
│   └── api.js
├── tests/
│   └── user-runner.test.js
├── .gitignore
├── package.json
└── README.md
```

## Запуск

Требуется Node.js 18 или новее (для встроенного `fetch`).

```bash
npm test
```

Команда запускает `node --test ./tests/user-runner.test.js`. Для выполнения тестов необходим доступ к JSONPlaceholder в интернете. Установка сторонних npm-пакетов не требуется.

## Особенности

- Позитивные и негативные сценарии;
- Проверка статусов HTTP и данных JSON;
- `assert.equal()`, `assert.ok()`, `assert.deepEqual()`;
- Проверка массивов, уникальности ID и вложенных объектов;
- Вспомогательные функции `getUserData()` и `getPostsData()`.

Учебный проект Junior QA / API Automation.
