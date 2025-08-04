const Recipe = require("../models/recipe");
const Review = require("../models/review");
const mongoose = require("mongoose");

const recipe = async (req, res) => {
    const ids = req.body.ids 
    let recipes = []
    if(ids.length > 0){
    for(id of ids){
            recipes.push(await Recipe.findById(id))
        }
    }
    res.send(recipes)
}

const recipePage = async (req, res) => {
    let id = req.query.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("Invalid id");
    let data = await Recipe.findById(id)
    if(!data) return res.redirect("/");

    let user = req.session?.passport?.user
    let userReview;
    let canEdit = false;
    let favourite = 0;
    let canAdd = (user) ? true : false;
    if(user) {
        if(id in req.session.passport.user.cart) canAdd = false;
        let userID = user._id
        userReview = await Review.findOne({userID, recipeID: id})
        if(data.owner == user._id || user.permissions.includes("ADMIN")){
            canEdit = true;
        }
        favourite = 1;
        if(user.favouriteRecipes.includes(id)) favourite = 2;
    }

    

    data.no_ratings = await Review.countDocuments({recipeID: id})
    let recipeID = new mongoose.Types.ObjectId(id)
    data.rating = (await Review.aggregate([
        { $match: {recipeID}},
        { $group: {_id:"$recipeID", average: {$avg: '$rating'}}}
    ]))[0]?.average
    res.render('./recipe/recipe', {data, userReview, canEdit, favourite, canAdd})
}

const review = (req, res) => {
    let data = req.body;
    let recipeID = req.body.recipeID
    try {
        if(!req.session?.passport?.user) {
            res.statusMessage ='User not logged in'
            res.status(403).send()
        }
        data["userID"] = req.session.passport.user
        let query = {recipeID: recipeID, userID: data.userID}

        Review.findOneAndReplace({recipeID: recipeID, userID: data.userID}, data, {upsert:true})
            .then(() => {
                res.status(200).send("Succes")
            }).catch((err) =>{
                console.log(err)
                res.status(500).statusText("An internal error occured")
            })

    } catch (error) {
        console.log(error)
    }
}

const submitPage = async (req, res) => {
    let id = req.query.id
    if(id == "new"){
        res.render('./recipe/submit', {data: {id: "new", title: "Your new recipe", ingredients: [], steps: []}})
    }else if(mongoose.Types.ObjectId.isValid(id)){
        let data = await Recipe.findById(id).catch((err) => console.log(err))
        if(!data) return res.redirect("/");
        res.render('./recipe/submit', {data})
    }else {
        res.redirect("/");
    }
}

const submit = async (req, res) => {
    let data = {
        title: req.body.title,
        description: req.body.description,
        ingredients: [],
        steps: []
    }

    
    for(key in req.body){
        if(key.includes("name")){
            if(req.body[key]) data.ingredients.push({
                name: req.body[key],
                link: req.body[`link-${key.split("-")[1]}`]
            })
        }else if(key.includes("step")){
            if(req.body[key]) data.steps.push(req.body[key])

        }
    }

    if(req.files){
        data["image"] = req.files.photo.data;
    }

    if(req.body.id == "new"){
        data.owner = req.session.passport.user._id;
        let result = await Recipe.create(data)
        res.status(200).redirect(`/recipe?id=${result._id}`)
    }else if( mongoose.Types.ObjectId.isValid(req.body.id)){
        await Recipe.findByIdAndUpdate(req.body.id, data);
        res.status(200).redirect(`/recipe?id=${req.body.id}`)
    }else {
        res.status(400).redirect(`/recipe?id=${req.body.id}`)
    }

}

const randomRecipe = async (req, res) => {
    let count = await Recipe.countDocuments();
    var random = Math.floor(Math.random() * count)
    let recipe = await Recipe.findOne().skip(random)
    let data = recipe.toObject()
    let recipeID = recipe._id

    data.no_ratings = await Review.countDocuments({recipeID: recipeID})
    data.rating = (await Review.aggregate([
        { $match: {recipeID}},
        { $group: {_id:"$recipeID", average: {$avg: '$rating'}}}
    ]))[0]?.average

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}

const getRecipes = async (req, res) => {
    let { value, filter, sort }  = req.body;
    let regex = "^.*"

    value.trim().split(" ").forEach(w => {
        regex += `(?=.*\\b${w}\\b)`
    })

    regex += ".*$"

    let data = await Recipe.aggregate([
        
        {$match :{title: { $regex: regex, $options: "i" }}},
        {
            $lookup: {
                from: Review.collection.name,
                localField: "_id",
                foreignField: "recipeID",
                as: "ratings",
                pipeline: [
                    {
                        "$project": {
                          "_id": 0,
                          "rating": 1
                        }
                    }
                ]
            }
        },
        { 
            "$set": {
              "rating": { "$avg": "$ratings.rating" },
              "no_ratings": {"$size": "$ratings"}
            }
        },
        { 
            "$unset": "ratings"
        }
    ])

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));

}

module.exports = { recipe, recipePage, review, submitPage, submit, randomRecipe, getRecipes }