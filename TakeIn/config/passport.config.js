const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const User = require("../models/user");

async function initialize(passport){
    passport.use(new LocalStrategy({usernameField: "email"}, 
        async (email, password, done) => {
            const user = await User.findOne({email: email}) 
            if (!user) return done(null, false, {message: "No user with that email"});
            if (!await bcrypt.compare(password, user.password)) return done(null, false, {message: "Incorrect password"})
            return done(null, user);
        }));
    
    passport.serializeUser((user, done) => {
        let newUser = {
            _id: user.id,
            permissions: user.permissions,
            favouriteRecipes: user.favouriteRecipes,
            cart: {}
        }
        done(null, newUser)
})
    passport.deserializeUser(async (data, done) => {
        let id = data._id;
        let user = await User.findById(id)
        user.password = undefined
        done(null, user);
    })
}

module.exports = initialize;