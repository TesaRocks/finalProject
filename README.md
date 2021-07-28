# Project made with Typescript, Node.Js, Express.Js, MySql

## Front end of the project @ https://github.com/TesaRocks/final-project-front-end Made by myself. Please have a look

## General guidelines:

- Structure: Repositores => Services => Routers => Index
- Docker yml file containing a MySQl image.
- Naming variables is with camelCase formatting, being very descriptive with the naming.
- I tried to mantain a SOLID principle when coding.

### Repositories:

- Db.ts creates connection to MySql using TSyringe (A lightweight dependency injection container for TypeScript for constructor injection.)
- One repository per feature.
- Pagination is made by obtaining a slice of the DataBase.
- To avoid sql injection attacks I use "?" and at the Query Options "values" property I place the user values.

### Service:

- Each repository has it's own service.
- There is a model interface as per each feature.

### Routers:

- Each repository has it's own Router.
- Through "express-validator" middleware I validate user's inputs.
- Json web tokens are created and verified before delivering mysql data.
- Passwords are stored as hash strings using bcrypt library.

#### To test the all of the API's I have used **POSTMAN**.
