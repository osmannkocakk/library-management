# Library Management by Osman Koçak

This is a simple library management application built with Node.js, Express, TypeScript, and TypeORM.

### Install Dependencies
npm install express typeorm pg express-validator lodash dotenv
npm install --save-dev typescript ts-node @types/express @types/lodash @types/node

### Set Up the Database
Run the script under scripts/db.sql to create the tables in your db. Change the db name/user/password configuration in ormconfig.ts and .env file.

### Run the Application
Use  `ts-node src/server.ts` command to run the server in development mode

### API Endpoints

- **Users**
  - `GET /users`: Retrieve all users
  - `GET /users/:id`: Retrieve a specific user by ID
  - `POST /users`: Create a new user ({"name": "Osman Kocak"})

- **Books**
  - `GET /books`: Retrieve all books
  - `GET /books/:id`: Retrieve a specific book by ID
  - `POST /books`: Add a new book ({"name": "Book Name"})

- **Borrowing**
  - `POST /users/:userId/borrow/:bookId`: Borrow a book
  - `POST /users/:userId/return/:bookId`: Return a book ({"score": 9})