# Note Keep Server

Server for Note Keep App

## Features

- **User Authentication:**
- **Authorization:**
- **CRUD Operations:**
- **Admin Panel:**

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens) for session management

## Installation

Installation

```bash
git clone https://github.com/nishadkindre/notekeep-app-server.git
```

Install dependenices

```bash
npm install
```

## Usage

**1.Start the server:**

```bash
npm run dev
```

**2.Access the API endpoints**

Use tools like Postman(provide Authorisation in headers) or integrate them into your frontend application.

## API Endpoints

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in an existing user.
- **GET /api/auth/logout:** Log out the current user.
- **GET /api/notes:** Retrieve all notes of the authenticated user.
- **GET /api/notes/:id:** Retrieve a specific note by ID.
- **POST /api/notes:** Create a new note.
- **PUT /api/notes/:id:** Update a specific note by ID.
- **DELETE /api/notes/:id:** Delete a specific note by ID.
- **GET /api/admin/users:** Get all users (accessible only to admins).
- **DELETE /api/admin/users/:id:** Delete a user by ID (along with associated notes). (accessible only to admins)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`MONGODB_URI`
`JWT_SECRET`

## Author

- [@nishadkindre](https://github.com/nishadkindre)
