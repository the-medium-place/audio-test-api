// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");

var compression = require("compression");
var cors = require("cors");
const logger = require("morgan");
const bcrypt = require("bcrypt");
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

// const CORS_ORIGIN = "http://localhost:3000";
const CORS_ORIGIN = 'http://zgstowell-audiology.herokuapp.com'
app.use(cors({
    origin: [CORS_ORIGIN],
    credentials: true
}));

// ================================================================================
// ROUTER
// ================================================================================

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.use('/',allRoutes)

// app.get('/', (req, res) => {
//     res.send('api splash');
// })

// app.post("/login", (req, res) => {
//     db.User
//         .findOne({
//             where: {
//                 username: req.body.username
//             }
//         })
//         .then((dbUser) => {
//             if (dbUser.username === null) {
//                 res.status(404).send('could not find user');
//             }
//             if (bcrypt.compareSync(req.body.password, dbUser.password)) {
//                 //   req.session.username = dbUser;
//                 // console.log("success");
//                 // res.redirect('/view-events');
//                 //   res.redirect("/view-events");
//                 res.status(200).send('login successful');
//             } else {
//                 // console.log("unsuccess");
//                 //   res.redirect("/login-fail");
//                 res.status(404).send('username and password did not match!');
//                 // res.redirect('/');
//             }
//         })
//         .catch(err => console.log(err));
// })

// app.post('/api/users', ({ body },res) => {
//     db.User.create(body)
//     .then(dbNewUser => {
//         console.log(dbNewUser)
//         res.status(200).send(dbNewUser)
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).send(err)
//     })
// })

// =============================================================================
// LISTENER
// =============================================================================

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});