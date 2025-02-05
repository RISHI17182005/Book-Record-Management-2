const express = require("express");
const {getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById} = require("../controllers/bookController");

const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const {userModel,bookModel} = require("../models")

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parmanters: none
 */

router.get("/",getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by thier id
 * Access: Public
 * Parmanters: id
 */

router.get("/:id",getSingleBookById);

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parmanters: none
 */

router.get("/issued/user",getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Parmanters: none
 */

router.post("/", addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parmanters: id
 */

router.put("/:id", updateBookById)

module.exports = router;