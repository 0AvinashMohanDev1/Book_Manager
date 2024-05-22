
---

# Book Manager

## Overview
Book Manager is an application to manage books and users. This document provides details on available API endpoints, including user registration, login, and book management.

## About the Project

**Book Manager** is a web application designed to facilitate the management of users and books within a library or book collection system. The application provides a set of RESTful API endpoints for user registration, authentication, and book management, making it suitable for both small and large-scale implementations.

### Key Features
- **User Management**:
  - **Register**: Allows new users to register with default roles.
  - **Login**: Enables existing users to log in and receive an authentication token.
  - **Role-Based Access**: Implements role-based access control (Admin, Author, Reader) to ensure secure operations. Admins have additional privileges to manage users.
  - **CRUD Operations**: Admins can perform create, read, update, and delete operations on user data.

- **Book Management**:
  - **Add Books**: Allows users to add new books to the collection with details such as title, author, publication year, and cover page.
  - **View Books**: Provides endpoints to retrieve all books, get details of a specific book by ID, and search for books by title.
  - **Delete Books**: Enables users to delete books by their ID.

### Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Redis
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Documentation**: Swagger for API documentation

### How to Use
1. **Swagger Documentation**: Access the API documentation at [Swagger UI](https://bookmanager-production-2c6f.up.railway.app/api-docs/#/).
2. **User Registration and Login**: Use the provided endpoints to register a new user and log in to receive a token.
3. **Manage Books**: Add, view, search, and delete books using the respective endpoints.

### Installation and Setup
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up the environment variables and configure the MongoDB connection.
4. Run the application using `npm start`.
5. Access the Swagger UI for detailed API documentation and testing.

**Book Manager** aims to streamline the process of managing users and books, offering a secure and efficient solution for libraries, book clubs, and personal collections.

## Swagger URL
Access the API documentation here: [Swagger UI](https://bookmanager-production-2c6f.up.railway.app/api-docs/#/)

## Base URL
[Book Managment](https://bookmanager-production-2c6f.up.railway.app/)
For local run: [http://localhost:3000/api/]

## User Endpoints

### Register a New User
- **Endpoint**: `POST /api/users/register`
- **Request Schema**:
  ```json
  {
    "name": "User1",
    "email": "user@gmail.com",
    "password": "user"
    // Role will be 'Reader' by default
  }
  ```
- **Role Options**: `Admin`, `Author`, `Reader`
- **Response**:
  ```json
  {
    "_id": "664c608c8dc40e6359831687",
    "name": "User1",
    "email": "user1@gmail.com",
    "role": "Reader",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGM2MDhjOGRjNDBlNjM1OTgzMTY4NyIsImlhdCI6MTcxNjI4MTQ4NCwiZXhwIjoxNzE2Mjk5NDg0fQ.AvQRiQKpoeeQAB_cOFLjGfx_S2fVjD_QhPkLausUKDI"
  }
  ```
  - The token will also be saved into Redis. If not provided in the header, it will search Redis for the token.

### Log in an Existing User
- **Endpoint**: `POST /api/users/login`
- **Request Schema**:
  ```json
  {
    "email": "user@gmail.com",
    "password": "user"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "664c608c8dc40e6359831687",
    "name": "User1",
    "email": "user1@gmail.com",
    "role": "Reader",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGM2MDhjOGRjNDBlNjM1OTgzMTY4NyIsIm5hbWUiOiJVc2VyMSIsInJvbGUiOiJSZWFkZXIiLCJpYXQiOjE3MTYyODE2NTMsImV4cCI6MTcxNjI5OTY1M30.F06YS2czLBJazHBRB_IvFMoyYRp26ngmdh4aIOryiR8"
  }
  ```

### Get All Users (Admin Only)
- **Endpoint**: `GET /api/users/`
- **Unauthorized Response**:
  ```json
  {
    "message": "You are not authorized"
  }
  ```
- **Authorized Response**:
  ```json
  {
    "users": [
      {
      "_id": "664c172e620da48497071289",
      "name": "Avinash",
      "email": "avinash@gmail.com",
      "password": "$2b$10$mrW/zgeifm8yyW7Rp6NPWe1EqSaZT5cD2FzSybeBaI1K4zEmU9zrG",
      "role": "Admin",
      "__v": 0
    },
    {
      "_id": "664c2917032b6b2e40d9a39a",
      "name": "Admin",
      "email": "admin@gmail.com",
      "password": "$2b$10$bfbxCio.FYzVMnK/ToAkv.pZjXJ2c/zH7pC24Dx5PsqtdNsl0wvqi",
      "role": "Admin",
      "__v": 0
    },
    {
      "_id": "664c3dab5a2c87fe28d0e4d6",
      "name": "User",
      "email": "user@gmail.com",
      "password": "$2b$10$J4GoB1wMJcOIKu9sT2KpT.ZqAliBni1u/XmMS9oS/Hq/7W/EIOZL2",
      "role": "Reader",
      "__v": 0
    },
    {
      "_id": "664c3fa7549ffae8f5e046d8",
      "name": "Author",
      "email": "author@gmail.com",
      "password": "$2b$10$cVm83MPhvGrnspdHmsMSo.T2.VhjIBsw20gcEeRq4s3VxmAZY8c9S",
      "role": "Author",
      "__v": 0
    },
    {
      "_id": "664c7063005f740cfd8bb4cd",
      "name": "User 3",
      "email": "user3@gmail.com",
      "password": "$2b$10$SDqyLo3OS4ghdwC26zJlw.PmMVZj1QJRSlyVnf3bl/4uTjQo/I5i2",
      "role": "Author",
      "__v": 0
    },
    {
      "_id": "664d745fb34af405c5650995",
      "name": "User 5",
      "email": "user5@gmail.com",
      "password": "$2b$10$7IzSRlfoUqRBu6GfJJx9he8IyOQFGfuH5oc.7Y4Gu6eOD64rywbna",
      "role": "Reader",
      "__v": 0
    },
    {
      "_id": "664d74e5b34af405c565099c",
      "name": "Amd",
      "email": "amd@gmail.com",
      "password": "$2b$10$jEss9LS9qPgXWsP7aDQIwOtCLacgsZSbKFrND..KbJmupWTOPJ0Ai",
      "role": "Reader",
      "__v": 0
    }
    ]
  }
  ```

### Update Any User (Admin Only)
- **Endpoint**: `PUT /api/users/:id`
- **Request Schema**:
  ```json
  {
    "name": "Changed One"
  }
  ```
- **Unauthorized Response**:
  ```json
  {
    "message": "You are not authorized"
  }
  ```
- **Authorized Response**:
  ```json
  {
    "message": "User updated successfully"
  }
  ```

### Delete Any User (Admin Only)
- **Endpoint**: `DELETE /api/users/:id`
- **Unauthorized Response**:
  ```json
  {
    "message": "You are not authorized"
  }
  ```
- **Authorized Response**:
  ```json
  {
    "message": "User has been removed"
  }
  ```

## Book Endpoints

### Add a New Book (Admin/Author Only)
- **Endpoint**: `POST /api/books/`
- **Request Schema**:
  ```json
  {
    "title": "Soul-2",
    "author": "Olivia Wilson",
    "year": 2019,
    "coverPage": ""
  }
  ```
- **Response**:
  ```json
  {
    "message": "New book added",
    "book": {
      "title": "Soul-2",
      "author": "Olivia Wilson",
      "coverPage": "https://res.cloudinary.com/dw7ygy8nf/image/upload/v1716302150/Books/s8il17xpvsm8cm3cxth4.jpg",
      "year": 2019,
      "_id": "664cb1462aa7c0e2c8e5eada"
    }
  }
  ```
### Update a Existing Book (Admin/Author Only)
- **Endpoint**: `PUT /api/books/:id`
- **Request Schema**:
  ```json
  {
    "author":"Indra Nooyi"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Book Updated!"
  }
  ```

### Get All Books
- **Endpoint**: `GET /api/books/`
- **Response**:
  ```json
  [
    {
      "_id": "664c87f27f42a6a625ce2a25",
      "title": "Soul-2",
      "author": "Olivia Wilson",
      "coverPage": "https://m.media-amazon.com/images/I/51HzssloPbL.jpg",
      "year": 2019
    },
    {
      "_id": "664c9f2709adfeb2fa2e98d7",
      "title": "Soul-2",
      "author": "Olivia Wilson",
      "coverPage": "https://res.cloudinary.com/dw7ygy8nf/image/upload/v1716297510/Books/qndfhw6ulyuzdknwprp3.jpg",
      "year": 2019
    },
    {
      "_id": "664cb0532aa7c0e2c8e5ead4",
      "title": "Soul-2",
      "author": "Olivia Wilson",
      "coverPage": "https://res.cloudinary.com/dw7ygy8nf/image/upload/v1716301907/Books/usnvogeex63m2wyy0puj.jpg",
      "year": 2019
    }
  ]
  ```

### Get

 Book by ID
- **Endpoint**: `GET /api/books/:id`
- **Response**:
  ```json
  {
    "book": {
      "_id": "664cb0532aa7c0e2c8e5ead4",
      "title": "Soul-2",
      "author": "Olivia Wilson",
      "coverPage": "https://res.cloudinary.com/dw7ygy8nf/image/upload/v1716301907/Books/usnvogeex63m2wyy0puj.jpg",
      "year": 2019
    }
  }
  ```

### Get Book by Search
- **Endpoint**: `GET /api/books/search?title=harry potter`
- **Response**:
  ```json
  [
    {
      "_id": "664ce515cc6b041cb5a0fc11",
      "title": "Harry Potter",
      "author": "J.K. Rowling",
      "coverPage": "https://res.cloudinary.com/dw7ygy8nf/image/upload/v1716315412/Books/pvccq6n6bkb1uq1tbkfn.jpg",
      "year": 1997
    }
  ]
  ```

### Delete Book by ID (Admin Only)
- **Endpoint**: `DELETE /api/books/:id`
- **Response**:
  ```json
  {
    "message": "Book removed"
  }
  ```

---

### Thank you for visiting. 
- **For any suggestion:** 
- Please reach out to me via:
- Mobile: 8187939429 / 9792190895
- Email: avinashmohandev@gmail.com