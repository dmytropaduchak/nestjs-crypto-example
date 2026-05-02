# 🇺🇦 HELP UKRAINE

We fight for democratic values, for freedom, for our future. We need your support. 
Solidarity with the Ukrainian people against the Russian invasion [Find out how you can help.](https://war.ukraine.ua/support-ukraine/).

# NestJS Crypto Example
A simple NestJS framework (node.js) Crypto example.

## Installation 

For initialization env variables, use:
```sh
cp .env.example .env
```

For install/start application dependencies, use:

```sh
docker-compose up -d
```

For install NPM dependencies, use:

```sh
npm i
```

For initialization DB schema/migration, use:

```sh
npx prisma migrate dev
```

## Run application 

For run application, use:

```sh
npm run build && npm start
```

For run application at dev mode, use:

```sh
npm run start:dev
```

For open graphql playground visit `http://localhost:3000/graphql`


## Unit testing

For run unit tests, use:

```
npm run test
```

All unit test report you can find at `coverage/` folder.

For run test at watch mode, use:

```
npm run test:dev
```


## Linting

For check eslint rules, use:

```
npm run lint
```

For auto fix all eslint bugs, use:

```
npm run lint:fix
```

## License

Nest is [MIT licensed](LICENSE).