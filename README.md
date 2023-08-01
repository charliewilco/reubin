![Zaptread Header](.github/reubin-og.png)

# Zaptread

This is a really simple project that shows the usage of Next.js with TypeScript.

## Setup

### Prerequists

```
brew install postgres@14 node
```

### Node

Make sure you're using `18.x` because [Vercel](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version) currently lists their default runtime as that version. This project uses [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) & [Turborepo](https://turborepo.org/) and setup is simple:

```
yarn
```

### Database

Setup the database by running the following:

```
psql postgres
```

This should open a session, copy and paste the following.

```
CREATE DATABASE reubindb;
CREATE ROLE reubinadmin WITH LOGIN PASSWORD 'password';
ALTER ROLE reubinadmin WITH SUPERUSER;
ALTER DATABASE reubindb OWNER TO reubinadmin;
\q
```

Create an `.env` with the following:

```
DATABASE_URL="postgresql://reubinadmin:password@localhost:5432/reubindb?schema=public"
```

First push the db to setup the tables:

```
yarn db
```

#### Seeing the Project

You can populate the project with data by running the seed command. This will populate the database with feeds, tags and a single user.

```
yarn seed
```

The seed command can also be run with an `--email` flag:

```
yarn seed -- --email='yourtest@email.com'
```

This will allow you to login to the app with:

| key      | value              |
| -------- | ------------------ |
| email    | yourtest@email.com |
| password | P@ssw0rd           |

_NOTE_: Running this command will also clear the database of all existing data.

## Project Structure

### Commands

| command         | description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `yarn build`    | Runs build in each workspace                                     |
| `yarn test`     | Executes the tests in each workspace                             |
| `yarn clean`    | Clears out specific cache directories                            |
| `yarn generate` | Generates types from the GraphQL documents for server and client |
| `yarn dev`      | Run all projects in development mode                             |
| `yarn e2e`      | Kick of integration tests                                        |

### Scripts

Quality of life project scripts found in:

- `/scripts/*.mjs`

Use `.mjs` with `// @ts-check` at the top of the file.

### Application

- `/apps/browser-extension`: Chrome browser extension, uses React and Parcel recipes
- `/apps/graphql`: GraphQL server uses Apollo Server
- `/apps/ui`: Web application uses Next.js and TailwindCSS

Each project contains

- `/apps/<project>/src/*`: source code
- `/apps/<project>/test/*`: all unit tests

### Packages

- `/packages/rsskit`: Converts RSS to JSON
- `/packages/html`: Returns safe HTML to render
- `/packages/graphql-date-ts`: Custom date scalar for GQL
- `/packages/graphql-depth-limit`: TS port of `graphql-depth-limit`

Each project contains

- `/packages/<project>/src/*`: source code
- `/packages/<project>/test/*`: all unit tests

### End-to-end Tests

- `/e2e`: Built with [Playwright](https://playwright.dev/)

### Repository

- `/docs`: Documentation in markdown
- `/scripts`: Project specific scripts
