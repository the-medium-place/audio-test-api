// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");

var compression = require("compression");
var cors = require("cors");
const logger = require("morgan");
const allRoutes = require('./controllers')
// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================
var app = express();
var PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(compression());
app.use(logger("dev"));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const CORS_ORIGIN = ["http://localhost:3000"];
const CORS_ORIGIN = ['https://zgstowell-audiology.herokuapp.com']
app.use(cors({
    origin: [CORS_ORIGIN],
    credentials: true
}));

// ================================================================================
// ROUTER
// ================================================================================

app.use('/',allRoutes)


// =============================================================================
// LISTENER
// =============================================================================

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});