# Шаблон для разработки на TypeScript

![Скриншот](./bender-rodriguez.jpg)


## С чистого листа

Этот шаблон, оптимизированный для разработки на [TypeScript](https://www.typescriptlang.org/)
с преднастроенным тестированием ([`Jest`](https://jestjs.io/ru/)) и проверкой кода 
перед коммитами ([`husky`](https://github.com/typicode/husky) + [`lint-staged`](https://github.com/okonet/lint-staged)), можно создать
"с нуля" выполнив следующую последовательность команд в терминале:

```
npm init -y
npm i -D typescript jest ts-jest @types/jestnpm  @types/jest @jest/globals husky
npm pkg set scripts.build="tsc"
npm pkg set scripts.test="jest"
npm pkg set scripts.postinstall="npx tsc --init && npx ts-jest config:init && git init && ./node_modules/.bin/husky install && npx husky add .husky/pre-commit 'npm test' && git add . && git commit -am first"
npm run postinstall
```

## Установка шаблона

То же самое можно выполнить с помощью одной команды:

```
npx @yababay67/modern-setup <my-app>
```

Замените `<my-app>` именем директории (папки),
в которой будет вестить разработка. После установки 
следует отредактировать `package.json`, вписав название проекта,
автора, лицензию, версию и т.п.

## Что входит в состав

В шаблоне настроены:

* возможность писать код на TypeScript с проверкой типов;
* юнит-тестирование средствами `Jest` без проблем с подсветкой синтаксиса;
* проверка кода на добротность (`jest + eslint`) перед отправкой в репозиторий; для этого
    использованы возможности пакетов `husky` и `lint-staged`.

## Испортить и починить

Чтобы увидеть, как данная система следит за качеством кода, 
можно выполнить команду

```
npm run spoil
```

Тесты перестанут проходить и будет
невозможно сделать коммит, не изменив настройки. 
Чтобы вернуть проект в работоспособное состояние, выполните

```
npm run repair
```

## Пользователям `Windows`

Данный проект тестировался только в среде `Linux`. Пользователи `Windows`
могут самостоятельно подправить скрипты, если это необходимо, хотя, скорее всего,
большая часть возможностей будет работать и там.

