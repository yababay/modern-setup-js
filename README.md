# Modern setup from scrathc

```
npm init -y
npm i -D typescript jest ts-jest @types/jestnpm  @types/jest @jest/globals husky
npm pkg set scripts.build="tsc"
npm pkg set scripts.test="jest"
npm pkg set scripts.postinstall="npx tsc --init && npx ts-jest config:init && git init && ./node_modules/.bin/husky install && npx husky add .husky/pre-commit 'npm test' && git add . && git commit -am first"
npm run postinstall
```

