const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Types.ObjectId, required: true},
    reciever: {type: mongoose.Types.ObjectId, required: true},
    message: {type: String, required: true}
}, { versionKey: false, timestamps: {createdAt: true, updatedAt: false} })



module.exports = mongoose.model("message", messageSchema)
           