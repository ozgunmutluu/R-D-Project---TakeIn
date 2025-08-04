const Recipe = require("../models/recipe");
const User = require("../models/user")
const mongoose = require("mongoose")

const profilePage = async (req, res) => {
    if(!req.query.id && !req.session?.passport?.user?._id) res.redirect("/entry")
    else {
        try {
            let id = req.query.id ? req.query.id : req.session.passport.user._id
            let isOwner = (req.query.id == req.session?.passport?.user?._id || !req.query.id)
            let user = await User.findById(id)

            let followMethod = ""
            let followers = []
            if(!isOwner){
                let active = await User.findById(req.session.passport.user._id)
                if( active.friends.includes(id) ) followMethod = "DELETE"
                else followMethod = "POST"
            }else {
                for(friendId of user.friends){
                    let friend = await User.findById(friendId).select("firstName lastName image") 
                    followers.push(friend)
                }
            }

            let favouriteRecipes = [];
            for(recipe of user.favouriteRecipes){
                let data =await Recipe.findById(recipe)
                if (data) favouriteRecipes.push(data)
            }
            let leftovers = [];
            res.render('./profile/profile', {user, isOwner, favouriteRecipes, leftovers, followMethod, followers})
        } catch (error) {
            res.status(401).send("An error occured.")
            console.log(error)
        }
    }
}

const addFavourites = async (req, res) => {
    let user = req.session.passport.user
    let favouriteRecipes = user.favouriteRecipes
    if(!favouriteRecipes.includes(req.body.recipeID)) favouriteRecipes.push(req.body.recipeID)
    
    try {
        await User.findByIdAndUpdate(user._id, {
            favouriteRecipes : favouriteRecipes
        })
        req.session.passport.user.favouriteRecipes = favouriteRecipes
        req.session.save(function(err) {console.log(err);})
    
        res.status(200).send("succes")
    } catch (error) {
        res.status(501).statusText("An internal error occured.")
    }
}

const delFavourites = async (req, res) => {
    let user = req.session.passport.user
    let favouriteRecipes = user.favouriteRecipes
    let index = favouriteRecipes.indexOf(req.body.recipeID)
    if(index >= 0) favouriteRecipes.splice(index, 1)
    
    try {
        await User.findByIdAndUpdate(user._id, {
            favouriteRecipes : favouriteRecipes
        })
        req.session.passport.user.favouriteRecipes = favouriteRecipes
        req.session.save(function(err) {console.log(err);})
        res.status(200).send("succes")
    } catch (error) {
        res.statusText("An internal error occured.")
        res.status(501)
    }
}

const settingsPage = async (req, res) => {
    let user = await User.findById(req.session.passport.user._id, {password: 0, favouriteRecipes: 0, friends: 0})
    res.render('./profile/settings', {user})
}

const settings = async (req, res) => {

    let data = req.body;
    let id = data.id
    delete data.id;
    if(req.files){
        data["picture"] = req.files.photo.data;
    }
    try {
        let result = await User.findByIdAndUpdate(id, data);
        res.redirect("/profile")
    } catch{
        res.status(500).send("An error occured")
    }

}

const checkUser = async (req,res) => {
    let username = req.body.username

    let user = await User.findOne({username})
    
    if(user) {
        res.status(200).send({id: user._id});
    }else{
        res.statusText = "User not found"
        res.status(400).send()
    }

}

const addFollow = async (req,res) =>{
    let userId = req.session.passport.user._id
    let friendId = req.body.friendId
    let user = await User.findById(userId).select("friends")
    console.log(user)
    if(!user.friends) user.friends = []
    if(!user.friends.includes(friendId)) {user.friends.push(friendId)}
    console.log(user)
    let response = await User.findByIdAndUpdate(userId, user)
    res.status(200).send();
}

const delFollow = async (req, res) =>{
    let userId = req.session.passport.user._id
    let friendId = req.body.friendId
    let user = (await User.findById(userId).select("friends")).toObject()

    user.friends.splice(user.friends.indexOf(friendId) ,1)

    let response = await User.findByIdAndUpdate(userId, user)
    res.status(200).send();
}

module.exports = { profilePage, addFavourites, delFavourites, settingsPage, settings, checkUser, addFollow, delFollow }