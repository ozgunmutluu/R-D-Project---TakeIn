const mongoose = require("mongoose");
const mongoDbUrl = process.env.MONGODB_STRING;
mongoose.connect(mongoDbUrl)                            // Connect to server
    .then(()=>{
        console.log("Database connected")
    })

module.exports = mongoose