# Free Society API

The project uses typescript and consists of an Express server paired with Mongo database.

## Prerequisites

You will need the following installed on your system (globally):
* `node`;
* `npm`;
* `typescript`;
* `mongo`.

Then to pull in all the dependencies just run `npm install`.

## Project Structure

All source files are stored in `/api` which uses files found in:
* `database` - Mongo models and helpers for database queries;
* `routes` - API Router and its versions;
* `helpers` - Middlewares and helpers such as validators and authentication;
* `services` - External services such as sendgrid and mongoose.

The server entry is `/api/index.ts`.

## Tasks

### Development

* The backend server will be run through `npm run develop` which uses `nodemon` and only reloads when backend files change.
* The project uses eslint to unify the code and stored ing `/.eslintrc.js`.
* Typescript configuration stored in `/tsconfig.json` in root directory.

