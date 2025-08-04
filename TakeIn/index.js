require('dotenv').config()                              // Used for reading environmental variables (MongoDB string, Local IP)
const app = require("./config/express.config");         // Setup for express framework
const mongoose = require("./config/mongodb.config")     // Setup for mongoDB connection
const passport = require("passport");                   // Used for logging in admins and users


//#region ----------    Passport Setup  ----------
const initializePassport = require("./config/passport.config");
initializePassport(passport);
app.use(passport.initialize())
app.use(passport.session());
//#endregion

//#region ----------    Express Routers ----------
app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/homeRoutes'))
app.use('/profile', require('./routes/profileRoutes'))
app.use('/recipe', require('./routes/recipeRoutes'))
app.use('/', require('./routes/friendsRoutes'))
app.use("/leftover", require("./routes/leftoverRoutes"))
//#endregion


app.listen(process.env.PORT || 8000, () => {
    console.log(`listening on http://localhost:${process.env.PORT || 8000}/`);
});
