const express = require("express");

// import dbConnection file
const dbConnection = require("./dbConnection");

const bookRouter = require("./route/books");
const userRouter = require("./route/users");

// import db
const dotenv = require("dotenv");
dotenv.config();

const app = express();

dbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({
        message:"server intialising"
    })
});

app.use("/books",bookRouter);
app.use("/users",userRouter);

app.get("*",(req,res) => {
    res.status(404).json({
        message:"route doesn't exist"
    })
});

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});
