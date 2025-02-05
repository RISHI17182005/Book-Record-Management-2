const express = require("express");

const {users} = require("../data/users.json");

const {userModel, bookModel} = require("../models");

const {getAllUsers, getSingleUserById, createNewUser, updateUserById, deleteUser, getSubscriptionDetailsById} = require("../controllers/userController");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parmanters: none
 */

router.get("/",getAllUsers);

/**
 * Route: /users/:id
 * /users/2
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parmanters: id
 */

router.get("/:id",getSingleUserById);

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parmanters: none
 */

router.post("/",createNewUser)

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user data
 * Access: Public
 * Parmanters: id
 */

router.put("/:id",updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parmanters: id
 */

router.delete("/:id",deleteUser);

router.get("/subscription-details/:id",getSubscriptionDetailsById);

module.exports = router;