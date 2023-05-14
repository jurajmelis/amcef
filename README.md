# How to run application on local machine

## Installation

- Install [NodeJS](https://nodejs.org/en/) lts or latest version
- Install [Docker](https://www.docker.com/get-started/)

- In root dir run `npm install`
- In root dir run `docker-compose up` to setup postgres docker image for local development
- Create a .env file with the 3 parameters: PORT (e.g. 3000 by default), MONGO_URI (see docker-compose.yml) and SECRET (e.g. secret)

## Start the application
npm run start

Application runs on [localhost:3000](http://localhost:3000) by default.

## API

### POST /api/auth/register
- Description: Register new user
- Request
    - Body: Requires JSON with username and password
        Example: {
            "username": "john",
            "password": "pass"
        }
- Succesfull Response: {
    "message": "User registered successfully"
}

### POST /api/auth/login
- Description: Existing user login
- Request:
    - Body: Requires JSON with registered username and password
        Example: {
            "username": "john",
            "password": "pass"
        }
- Succesfull Response: {
    "token": *user token*
}

### GET /api/todo/
- Description: Return all ToDo entries
- Request: *no input values needed*
- Succesfull Response: {
    *array of todo entries*
}

### POST /api/todo/create
- Description: Create new ToDo entry
- Request:
    - Header: Bearer *token*
    - Body: Requires JSON with title, description, deadline
        Example: {
            "title": "ToDo 1",
            "description": "This is ToDo 1",
            "deadline": "05-24-2023"
        }
- Succesfull Response: {
    "message": "ToDo created successfully"
}

### PUT /api/todo/addUser/:id
- Description: Add user to users field for existing ToDo entry
- Request:
    - Header: Bearer *token*
    - Parameter: id of existing ToDo entry
    - Body: Requires JSON with userId
        Example: {
            "userId": "64614bb5b67a4bccbc9f4e75"
        }
- Succesfull Response: {
    "message": "users updated successfully"
}

### PUT /api/todo/addItem/:id
- Description: Add new field for existing ToDo entry and set value to it
- Request:
    - Header: Bearer *token*
    - Parameter: id of existing ToDo entry
    - Body: Requires JSON with userId
        Example: {
            "fieldName": "new_field",
            "fieldType": "String",
            "fieldValue": "something"
        }
- Succesfull Response: {
    "message": "Field appended successfully"
}
