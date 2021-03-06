<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with
[DocToc](https://github.com/thlorenz/doctoc)_

* [API](#api)
  * [Directory structure](#directory-structure)
  * [Database migrations and seed files](#database-migrations-and-seed-files)
    * [Running the integration tests](#running-the-integration-tests)
  * [Writing new tests](#writing-new-tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API

## Directory structure

Main files and directories of the application

```
api
├─ migrations           # Where knex migrations are stored
├─ seeds                # Where knex seed files are stored
└─ src
   ├─ routes            # Where endpoints are defined
   │  ├─ healthz.js     # Health check endpoints
   │  ├─ robots.js      # Endpoints for robots.txt
   │  ├─ index.js       # Test endpoint
   │  └─ users.js       # Endpoints for user authentication
   ├─ app.js            # Where the Express app object is created
   ├─ db.js             # File to require to access the db
   ├─ error-tracking.js # Configuration for the error tracking tool
   ├─ sessions.js       # Configuration for cookie-based sessions
   └─ index.js          # Starting point of the application
```

## Database migrations and seed files

This project uses `knex`. You can run the command line utility just doing

```
docker-compose exec api yarn run knex
```

You'll see all the options available. Some examples:

```
docker-compose exec api yarn run knex migrate:make [options] <name>          Create a named migration file.
docker-compose exec api yarn run knex seed:make [options] <name>             Create a named seed file.
docker exec -i boilerplate_api_1 npx sequelize db:seed:all                   Run seed files.
```

Migrations are run everytime the server starts with `yarn run start` or `yarn run start-dev`

### Running the integration tests

Integration tests access the API server and the database. These tests are not
run with `docker/test` and these tests require the containers to be up to pass.

The command to run them is:

```
docker-compose exec api yarn run test:integration
```

## Debugging

The project is prepared to be debugged thanks to the V8 debugging protocol. For example for VSCode you can create a launch configuration like this:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Docker",
      "port": 9229,
      "restart": true,
      "remoteRoot": "/opt/app",
      "localRoot": "${workspaceFolder}/api"
    }
  ]
}
```

## Writing new tests

**App unit tests**

In the very particular case of wanting to unit test the express application
configuration (inside `app.js`) you can use an structure like this:

```javascript
const { initResources, fetch, appUnit, closeResources } = require('./utils');

describe('App', () => {
  beforeAll(initResources);

  appUnit('testing some app.js configuration', async () => {
    process.env.SOME_ENV_VARIABLE = 'some-value';
    const res = await fetch('/some-url');
    expect(res.status).toEqual(200);
    // check headers or body here
  });

  appUnit('testing some app.js configuration', async () => {
    process.env.SOME_ENV_VARIABLE = 'some-different-value';
    const res = await fetch('/some-url');
    expect(res.status).toEqual(200);
    // check headers or body here
  });

  afterAll(closeResources);
});
```

This is useful in just a few scenarios:

* Testing HTTP headers
* Testing different responses based on env variables (e.g. the `/robots.txt`
  endpoint)

The only special thing about these tests is that they need to have the server
running, but not as an external process because you want to change the behavior
in each test.

**Integration tests**

Integration tests can access the database and the API server.

```javascript
const { integration } = require('./utils');

describe('App', () => {
  integration('do something with the server or the db or both', async () => {
    // Your test here
  });
});
```

The `integration` function is just either jest's `it` or `it.skip`. With this
utility when running only unit tests, integration tests will be skipped
transparently for you.
