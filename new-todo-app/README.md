# Todo-App

![App Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Typescript version](https://img.shields.io/badge/typescript-4.2.4-blue.svg)
![Express version](https://img.shields.io/badge/express-4.17.1-black)
![React Version](https://img.shields.io/badge/react-17.0.2-blue.svg)

Simple todo application written in typescript using nextjs(react) and express, using PostgreSQL as database.

## Running Locally

To begin the following are recommended

- NodeJS v14.16.1 or higher.
- Yarn v1.22.10 or higher.
- PostgreSQL v9 or higher.

To run the project in development mode

- Create a database in your Postgres server .
- cd into the server directory and copy the content .env.example file to a new .env file, providing the database details as required as well as preferred port the server is to be run on(defaults to port 4000).
- run `yarn install` or simply `yarn` to install project dependencies.
- run `yarn dev` to start the development server.
- cd into the client folder (`cd ../client`)
- copy the .env.example into a new .env.local file inside the client directory and specify the URL of the server according without the last '/', example: http://localhost:4000
- Run `yarn install` or simply `yarn` to install the project dependencies
- Run `yarn dev` to begin the frontend in development mode
- 🚀🚀 App should be available on localhost port 3000!

## Database seeding

To seed the database with test data. cd into the server folder and run the command `yarn seed:run`
