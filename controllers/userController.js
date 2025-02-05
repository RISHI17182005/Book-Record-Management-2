const { userModel, bookModel } = require("../models");

exports.getAllUsers = async (req, res) => {
    const users = await userModel.find(_id);

    if (users.length === 0) {
        res.status(404).json({
            success: false,
            message: "No users"
        })
    }
    res.status(200).json({
        success: true,
        data: users
    })
}

exports.getSingleUserById = async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findById({ _id: id });

    if (!user) {
        res.status(404).json({
            success: false,
            message: "user doesn't exist"
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
}

exports.createNewUser = async (req, res) => {
    const { name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate } = req.body;

    const newUser = await userModel.create({
        name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate
    })

    res.status(201).json({
        success: true,
        data: newUser
    })
}

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updateUserData = await userModel.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $set: {
                ...data
            }
        },
        { new: true }
    )

    return res.status(201).json({
        success: true,
        data: updateUserData
    })
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findOneAndDelete({ _id: id })

    if (!user) {
        res.status(404).json({
            success: false,
            message: "User doesn't exist"
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
}

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
        res.status(404).json({
            success: false,
            message: "User doesn't exist"
        })
    }

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            date = newDate();
        }
        else {
            date = newDate(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date += 90;
        }
        else if (user.subscriptionType === "Standard") {
            date += 180;
        }
        else if (user.subscriptionType === "Premium") {
            date += 360;
        }
        return date;
    }

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: currentDate < returnDate,
        daysLeftForExpiration:
            subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine:
            returnDate < currentDate
                ? subscriptionExpiration <= currentDate
                    ? 200
                    : 100
                : 0,
    };
    res.status(200).json({
        success:true,
        data:data
    })
}                                             



