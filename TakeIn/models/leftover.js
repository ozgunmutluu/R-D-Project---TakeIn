const mongoose = require("mongoose")

const leftoverSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {},
    owner: {type: mongoose.Types.ObjectId, ref: "User", required: true},
}, { versionKey: false, timestamps: { createdAt: true, updatedAt: false }})

module.exports = mongoose.model("leftover", leftoverSchema)
