
## Installation

```bash
$ npm install
```

## Sample api

```bash
http://localhost:3000/
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migration

```bash
# Generate a new migration
$ npx typeorm migration:generate -- db/migrations/NewMigration

# Run the migration
$ npm run migration:run

# Revert migration
$ npm run migration:revert
```

## Setting env file

ENV file names will be different in different environments.

At the moment, we have 1 environment:

| Environment | ENV file name          | Usage                                                     |
| :---------- | :--------------------- | :-------------------------------------------------------- |
| Development | .env.development.local | For developers's local environment                        |

> Note: `ENV file name === ".env.${process.env.NODE_ENV || 'development'}.local"`
