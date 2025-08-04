const Recipe = require("../models/recipe");
const Review = require("../models/review");

const homePage = async (req, res) => {  
    let hotRecipes = [];

    let filterDate = new Date()
    filterDate.setDate(filterDate.getDate() - 14);
    let ratings = await Review.aggregate([
        { $match: { createdAt: {$gte: filterDate}}},
        { $group: { _id: '$recipeID', rating: {$avg: "$rating"}, count: {$count: {}}} }
    ]).exec()

    ratings.sort((a,b) => b.count - a.count)
    ratings.sort((a,b) => b.rating - a.rating)
    for(rating of ratings.slice(0,2)){
        let recipe = await Recipe.findById(rating)
        recipe["rating"] = rating.rating
        recipe["no_ratings"] = rating.count
        hotRecipes.push(recipe)
    }
    let newRecipes = await Recipe.find({}, {}, {sort: {createdAt: -1}}).limit(2)

    res.render('./home/home', {nav: "home", hotRecipes, newRecipes})
}

const cartPage = async (req, res) => {
    let data =[];
    let cart = req.session.passport.user.cart
    for(id in cart){
        let response  = await Recipe.findById(id)
        let recipe = response.toObject()
        recipe.no_people = cart[id]
        data.push(recipe)
    }
    res.render('./home/cart', {data})
}

const addCart = (req, res) =>{
    let data = req.body
    let cart = req.session.passport.user.cart
    if(data.recipeID in cart){
        cart[data.recipeID] += data.people
    }else {
        cart[data.recipeID] = data.people
    }
    req.session.save()
    res.status(200).send()
}

const delCart  = (req, res) =>{
    let data = req.body
    let cart = req.session.passport.user.cart
    if(data.recipeID in cart){
        delete cart[data.recipeID]
    }
    req.session.save()
    res.status(200).send()
}

const searchPage = async (req, res) => {

    rating = await Review.aggregate(
        [
            { $group: { _id: '$recipeID', rating: {$avg: "$rating"}} }
        ]
    ).exec()

    res.render('./home/search', {nav: "search"})
}



module.exports = { homePage, cartPage, searchPage, addCart, delCart }