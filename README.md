# Modern setup from scratch

![Скриншот](./bender-rodriguez.jpg)

If you want to create modern JavaScript project
with Typescript and unit testing support,
please execute following commands in your terminal:

```
npm init -y
npm i -D typescript jest ts-jest @types/jestnpm  @types/jest @jest/globals husky
npm pkg set scripts.build="tsc"
npm pkg set scripts.test="jest"
npm pkg set scripts.postinstall="npx tsc --init && npx ts-jest config:init && git init && ./node_modules/.bin/husky install && npx husky add .husky/pre-commit 'npm test' && git add . && git commit -am first"
npm run postinstall
```

or you can install it from this package running

```
npx @yababay67/modern-setup <my-app>
```

Please replace `<my-app>` with name of directory in which
you will develop the project.


