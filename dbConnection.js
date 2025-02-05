const mongoose = require("mongoose");

function DBConnection(){
    DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    })

    const db = mongoose.connection;

    db.on("error",console.error.bind(console,"Connection error"));
    db.once("open", function (){
        console.log("DB connceted");
    })
}
module.exports = DBConnection;