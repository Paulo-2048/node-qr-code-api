<!-- ![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png) -->

# Node.JS API Template

A generic template, for quickly building Node.JS based API's, and fast deploy in Vercel host

## Features Include

- Folder/Files Structure
- MySQL Database Integration
- .Env File
- JSON Web Token (JWT)
- SOLID Principles
- Made With Git Flow
- Open for Pull Requests

## Get Start

- Clone this repository to destination folder in you on your machine

```bash
  git clone https://github.com/Paulo-2048/api-nodejs-template
```

- Go to the project directory

```bash
  cd api-nodejs-template
```

- Install dependencies

```bash
  npm install
```

- Change .env-example to .env, and this respectives environment variables

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET` -> JWT SECRET

`HOSTDB` -> Database Host

`USERNAMEDB` -> Database Username

`PASSWORDDB` -> Database Password

`DATABASEDB` -> Database name

`PORT` -> Server Port

## Folder Structure

Most simple example project is this one, using following project structure.

```sh
project
├── api
    └── controller
    └── database
        └── connectionDatabase.js
    └──models
    └── routes
    └── index.js
└── config
    └── config.js
└── middleware
└── rules
└── utils
└── .env
└── .gitignore
└── package.json
└── README.md
└── vercel.json
```

## API Exemple Reference

#### Get Status

```http
  GET /
```

Returns status api

#### Get user

```http
  GET /user
```

Returns all user of database

#### Get user by id

```http
  GET /user/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of user to fetch |

Returns the user of id in database

```http
  post /user/
```

| Parameter  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `name`     | `string` | **Required**. Name to save in database     |
| `email`    | `string` | **Required**. Email to save in database    |
| `password` | `string` | **Required**. Password to save in database |

Returns the id created when sucess

```http
  post /user/login
```

| Parameter  | Type     | Description                                  |
| :--------- | :------- | :------------------------------------------- |
| `email`    | `string` | **Required**. Email to search in database    |
| `password` | `string` | **Required**. Password to search in database |

Returns the jwt token when sucess

```http
  post /user/update
```

| Parameter | Type                 | Description                                                 |
| :-------- | :------------------- | :---------------------------------------------------------- |
| `token`   | `string (jwt token)` | **Required**. Token to authentication                       |
| `id`      | `string`             | **Required**. Id of user that will be updated               |
| `column`  | `string`             | **Required**. Column that will be updated                   |
| `value`   | `string`             | **Required**. Value with which collumn that will be updated |

Returns only success or failure message

```http
  post /user/delete
```

| Parameter | Type                 | Description                                   |
| :-------- | :------------------- | :-------------------------------------------- |
| `token`   | `string (jwt token)` | **Required**. Token to authentication         |
| `id`      | `string`             | **Required**. Id of user that will be deleted |

Returns only success or failure message

<!-- ## FAQ

#### Whats the depe

Answer 1

#### Question 2

Answer 2 -->

## Feedback

If you have any feedback or suggestion, please reach out to me at paulo19032004@gmail.com
