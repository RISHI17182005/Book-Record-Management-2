const { userModel, bookModel } = require("../models");
const IssuedBook = require("../DTO/bookDTO");

exports.getAllBooks = async (req, res) => {
    const books = await bookModel.find();

    if (books.length === 0)
        return res.status(404).json({
            message: "Books not found",
            success: false
        })
    res.status(200).json({
        success: true,
        data: books
    })
}

exports.getSingleBookById = async (req, res) => {
    const {id} = req.params;
    const book = await bookModel.findById(id);

    if (!id) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        })
    }
    res.status(200).json({
        success: true,
        data: book
    })
}

exports.getAllIssuedBooks = async (req, res) => {
    const users = await bookModel.find({
        issuedBook: { $exists: true }
    }).populate("issuedBook");

    const issuedBooks = users.map((each) => new IssuedBook(each));

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Issued Books"
        })
    }
    res.status(200).json({
        success: true,
        data: issuedBooks
    })
}

exports.addNewBook = async (req, res) => {
    const { data } = req.body;

    if (!data) {
        res.status(404).json({
            success: false,
            message: "No data to add"
        })
    }

    await bookModel.create(data);
    const allBooks = await bookModel.find();

    return res.status(201).json({
        success: true,
        data: allBooks
    })
}

exports.updateBookById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updateBook = await bookModel.findOneAndUpdate({_id: id},data,{new: true})
    return res.status(201).json({
        success:true,
        message:"updated",
        data:updateBook
    })
}


