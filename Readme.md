![Reubin Header](.github/reubin-og.png)

# Reubin

This is a really simple project that shows the usage of Next.js with TypeScript.

## Setup

### Prerequists

```
brew install postgres@14 node
```

### Node

Make sure you're using `16.x` because [Vercel](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version) currently lists their default runtime as that version. This project uses [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) & [Turborepo](https://turborepo.org/) and setup is simple:

```
npm install
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
npm run db
```

Then run the seed comment to populate the db:

```
npm run seed
```

## Project Structure

### Application

- `/apps/browser-extension`: Chrome browser extension, uses Preact and Parcel recipes
- `/apps/graphql`: GraphQL server uses Fastify and Mercurius
- `/apps/ui`: Web application uses Next.js and TailwindCSS

Each project contains

- `/apps/<project>/src/*`: source code
- `/apps/<project>/test/*`: all unit tests

### Repository

- `/docs`: Documentation in markdown
- `/scripts`: Project specific scripts
