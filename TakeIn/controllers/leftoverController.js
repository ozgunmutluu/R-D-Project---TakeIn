const Leftover = require("../models/leftover");
const mongoose = require("mongoose");
const Message = require("../models/message");

const findPage = async (req, res) => {
    let data = await Leftover.find();

    res.render('./leftover/find', {data})
}

const leftoverPage = async (req, res) => {
    let id = req.query.id
    if(!mongoose.Types.ObjectId.isValid(id)) res.redirect("/");
    let data = await Leftover.findById(id)
    if(!data) res.redirect("/");

    res.render('./leftover/leftover', {data})
}

const createLeftoverPage = async (req, res) => {
    let id = req.query.id
    if(id == "new"){
        res.render('./leftover/createleftover', {data: {id: "new", title: "Your new leftover", ingredients: [], steps: []}})
    }else if(mongoose.Types.ObjectId.isValid(id)){
        let data = await Leftover.findById(id).catch((err) => console.log(err))
        if(!data) res.redirect("/");
        res.render('./leftover/createleftover', {data})
    }else {
        res.redirect("/");
    }
}

const createLeftover = async (req, res) => {
    let data = {
        title: req.body.title,
        description: req.body.description,
    }

    if(req.files){
        data["image"] = req.files.photo.data;
    }

    if(req.body.id == "new"){
        data.owner = req.session.passport.user._id;
        let result = await Leftover.create(data)
        res.status(200).redirect(`/leftover?id=${result._id}`)
    }else if( mongoose.Types.ObjectId.isValid(req.body.id)){
        await Leftover.findByIdAndUpdate(req.body.id, data);
        res.status(200).redirect(`/leftover?id=${req.body.id}`)
    }else {
        res.status(400).redirect(`/leftover?id=${req.body.id}`)
    }
}

const pickup = async (req,res) => {
    let {leftoverID, owner} = req.body;
    let id = req.session.passport.user._id
    if(id == owner) {
        res.statusText = "Cannot pickup own leftover"
        res.status(400).send()
    }else{
        await Message.create({sender: id, reciever: owner, message: "Hey, I would like to pickup your leftover. Can we arrange a time?"})
        await Leftover.findByIdAndDelete(leftoverID)
        res.status(200).send()
    }
}

module.exports = { leftoverPage, createLeftover, createLeftoverPage, findPage, pickup }