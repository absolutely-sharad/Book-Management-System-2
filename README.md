# Library Book Management System

This is a backend project for managing a library's book inventory. It is built using Node.js and Express.js, with MongoDB as the database. The system allows users to add new books to the inventory and retrieve a list of all books.

## Features

- Add a new book to the inventory
- Retrieve a list of all books in the inventory

## Prerequisites

- Node.js and npm installed
- MongoDB database (MongoDB Atlas is used in this project)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/LibraryBookManagementSystem.git
    cd LibraryBookManagementSystem
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure MongoDB:

    Update the MongoDB connection string in `index.mjs` with your own MongoDB connection string.

## Usage

1. Start the server:

    ```bash
    node index.mjs
    ```

    The server will start on port 9000. You will see the message "Server Started on port: 9000" if the server starts successfully.

2. API Endpoints:

    - **Add a new book**

        - URL: `/books/add`
        - Method: `POST`
        - Request Body:
            ```json
            {
                "title": "Book Title",
                "author": "Author Name",
                "genre": "Genre",
                "ISBN": "ISBN Number",
                "availability": true
            }
            ```
        - Response:
            ```json
            {
                "Response": "Book Added Successfully",
                "message": {
                    "title": "Book Title",
                    "author": "Author Name",
                    "genre": "Genre",
                    "ISBN": "ISBN Number",
                    "availability": true,
                    "_id": "generated_id",
                    "createdAt": "timestamp",
                    "updatedAt": "timestamp",
                    "__v": 0
                }
            }
            ```

    - **Retrieve all books**

        - URL: `/books`
        - Method: `GET`
        - Response (if books are found):
            ```json
            {
                "Response": "Ohh yeah! Found the Book",
                "Data": [
                    {
                        "title": "Book Title",
                        "author": "Author Name",
                        "genre": "Genre",
                        "ISBN": "ISBN Number",
                        "availability": true,
                        "_id": "generated_id",
                        "createdAt": "timestamp",
                        "updatedAt": "timestamp",
                        "__v": 0
                    }
                ]
            }
            ```
        - Response (if no books are found):
            ```json
            {
                "Response": "Apologies! No Books Found",
                "Data": []
            }
            ```

## Project Structure

- **index.mjs:** Entry point of the application. Sets up the Express server and connects to the MongoDB database.
- **src**
  - **controllers**
    - **BookControllers.mjs:** Contains the logic for handling book-related API requests.
  - **models**
    - **BookModels.mjs:** Defines the Mongoose schema and model for books.
  - **routes**
    - **BookRoutes.mjs:** Defines the API routes for books.

## Code Explanation

### `index.mjs`

```javascript
import express from 'express';
import mongoose from 'mongoose';
import router from '../src/routes/BookRoutes.mjs';

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://sharadsingh0203:sharad%40%400209%40%400203@cluster0.xogxrhv.mongodb.net/BooksData")
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

app.use('/', router);

app.listen(9000, () => {
    console.log('Server Started on port:', 9000);
});
This file sets up the Express server and connects to the MongoDB database. It also imports and uses the router for handling API requests.
```
BookControllers.mjs
```javascript
import BookModels from '../models/BookModels.mjs';

const createBook = async (req, res) => {
    const data = req.body;
    const books = await BookModels.create(data);
    const resp = 'Book Added Successfully';
    return res.status(201).send({ Response: resp, message: books });
};

const findBooks = async (req, res) => {
    const books = await BookModels.find();
    let message;
    if (books.length === 0) {
        message = "Apologies! No Books Found";
    } else {
        message = "Ohh yeah! Found the Book";
    }
    res.status(200).send({ Response: message, Data: books });
};

export { createBook, findBooks };
This file contains the logic for creating a new book and finding all books in the inventory.

```

```jsx
BookModels.mjs
javascript
Copy code
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    ISBN: String,
    availability: Boolean
}, { timestamps: true });

export default mongoose.model('bookData', bookSchema);
This file defines the Mongoose schema and model for books.
```

BookRoutes.mjs
```javascript
import express from 'express';
import { createBook, findBooks } from '../controllers/BookControllers.mjs';

const router = express.Router();
export default router;

router.post('/books/add', createBook);
router.get('/books', findBooks);
This file defines the API routes for adding a new book and retrieving all books.
```

#### License
This project is licensed under the MIT License. See the LICENSE file for details.

#### Acknowledgements
- Node.js
- Express.js
- MongoDB
- Mongoose

  Feel free to contribute to this project by submitting issues or pull requests.
