<div align="center">

  <h3 align="center">
      Hubla Transactions
  </h3>
  <br />

</div>

## Built with

-   ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?logo=nestjs&logoColor=white&style=for-the-badge)
-   ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
-   ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
-
-   ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white&style=for-the-badge)
-   ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?logo=vuedotjs&logoColor=%234FC08D&style=for-the-badge)
-   ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?logo=tailwind-css&logoColor=white&style=for-the-badge)

## Setup

The project can be run in a **production environment** with a single `docker-compose` located on project root

0. Install docker and docker-compose
1. Copy `.env.example` to a `.env` file on project root, making changes if necessary
    - The `NGINX_PORT` variabel defines the port in wich the application will be exposed
2. The web interface can be accessed at `http://localhost:NGINX_PORT` and the server at `http://localhost:NGINX_PORT/api/`
    - Setting `NGINX_PORT` to `80`, the **default HTTP port**, exposes the app at `http://localhost` and `http://localhost/api/`
3. At project root run:
    - `docker-compose up`

## Testing

There is also a **docker-compose** setup in the `server` directory for running the backend test suites

1. `cd server`
2. Make sure the variables in `.env.test` have appropriate values
3. Run:
    - `yarn docker:test:run`

## Development

Curently there is no docker development environment setup

-   **Prerequisites**

1. A running `postgres service`, either in a Docker container or in a local instance
2. Having `Node` [installed](https://github.com/nvm-sh/nvm)

-   **Back-end**

1. `cd server`
2. Copy `.env.example` to a `.env` file, making changes if necessary
3. `yarn start:dev`

-   **Front-end**

1. `cd client`
2. Copy `.env.example` to a `.env` file, making changes if necessary
    - The `VITE_SERVER_BASE_URL` environment variable should point to the running server URL
3. `yarn dev`

## :rocket: Routes

-   The default responses are:

    -   `200` - Successful GET request
    -   `201` - Successful POST request
    -   `204` - Successful DELETE request
    -   `401` - Auth errors
    -   `404` - Resource not found
    -   `422` - Body validation error on POST requests

-   By default routes require: `Authorization: Bearer TOKEN` header for JWT auth
-   🔓denotes an open route

```yml
GET /
- 🔓 Hello from running server!
```

### Auth

```yml
POST /auth/signup
    - 🔓 Route for creating a new user
    - body:{
        "username": "jondoe",
        "password": "DonJoe27"
      }
    - response: {"token": "JWT_TOKEN"}
```

```yml
POST /auth/signin
    - 🔓 Route for signing an existing user
    - body:{
        "username": "jondoe",
        "password": "DonJoe27"
    }
    - Response: {"token": JWT_TOKEN}
```

```yml
POST /auth/delete
    - Deletes current signed user
    - headers: {"Authorization": "Bearer TOKEN"}
```

### Transactions

```yml
POST /transactions/upload
    - Route for creating many transactions via input file
    - Duplicate transactions are ignored by a unique (vendorId & productId & date) contraint
    - headers: {"Authorization": "Bearer TOKEN"}
    - Form Data: { file }
```

```yml
GET /transactions
    - Route for getting all trnasactions
    - headers: {"Authorization": "Bearer TOKEN"}
    - Response: array of transactions
```

```yml
GET /credentials/:id
    - Route for finding one transaction
    - headers: {"Authorization": "Bearer TOKEN"}
    - Response: transaction
```

```yml
DELETE /credentials/:id
    - Route for deleting one transaction
    - headers: {"Authorization": "Bearer TOKEN"}
```
