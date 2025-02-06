# Backend Library System

## About This Project
Backend Library is a library management system built using **Node.js** and **Express**. It allows users to borrow and return books, manage user accounts, and track transactions. This project provides a clean and simple API for all library operations.

## Features
- **Book Management**: Manage books with CRUD functionality.
- **User Management**: Register and manage users.
- **Transaction Management**: Track borrowed and returned books.
- **JWT Authentication**: Secure the system with user authentication.
- **RESTful API**: Simple and effective API for library operations.

## Project Structure
```
📂 backend-library  
 ┣ 📂 controllers     # Logic for managing books, users, and transactions  
 ┣ 📂 models          # Data models for books, users, and transactions  
 ┣ 📂 routes          # API route definitions  
 ┣ 📂 middleware      # Middleware for authentication and error handling  
 ┣ 📜 app.js          # Main Express application setup  
 ┣ 📜 config.js       # Environment configurations  
 ┣ 📜 .env            # Environment variables (e.g., DB connection)  
 ┣ 📜 package.json    # Project dependencies and scripts  
 ┣ 📜 README.md       # Project documentation  
```

## How to Run
1. Clone this repository:
   ```
   git clone <REPO_URL>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   DB_URI=<your_mongo_db_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```
4. Start the server:
   ```
   npm start
   ```
5. The server will be running at `http://localhost:3000`.

## API Endpoints
- **POST** `/api/books` - Add a new book.
- **GET** `/api/books` - Get all books.
- **GET** `/api/books/:id` - Get a specific book by ID.
- **PUT** `/api/books/:id` - Update an existing book.
- **DELETE** `/api/books/:id` - Delete a book.
- **POST** `/api/users` - Register a new user.
- **GET** `/api/users` - Get all users.
- **GET** `/api/users/:id` - Get a specific user by ID.
- **POST** `/api/transactions` - Borrow a book.
- **GET** `/api/transactions` - Get all transactions.
- **GET** `/api/transactions/:id` - Get a specific transaction by ID.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose for data modeling)
- **JWT** (JSON Web Tokens) for authentication
- **Body-parser** for parsing incoming JSON request bodies

## Usage Example
- To add a new book, send a `POST` request to `/api/books` with data like:
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "availability": true
  }
  ```

- To borrow a book, send a `POST` request to `/api/transactions` with:
  ```json
  {
    "userId": "60f4a7b6d8f5b8a1b60c5b0f",
    "bookId": "60f4a7b6d8f5b8a1b60c5b0a",
    "borrowDate": "2025-02-06",
    "dueDate": "2025-02-13"
  }
  ```

## Future Improvements
- Add book reservation functionality.
- Implement overdue fines and notifications.
- Add more advanced search and filter capabilities for books.

This project provides a solid foundation for creating a library management system, and it can be extended and customized to fit more specific use cases.
