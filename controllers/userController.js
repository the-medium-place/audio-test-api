const express = require("express");
const router = express.Router();
const db = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config()

const checkAuthStatus = request => {
    // console.log("headers: ",request.headers);
    if (!request.headers.authorization) {
        return false
    }
    const token = request.headers.authorization.split(" ")[1]
    // console.log(token);
    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // console.log("err: ", err)
            return false
        }
        else {
            // console.log("data: ", data)
            return data
        }
    });
    // console.log("loggedInUser: ",loggedInUser)
    return loggedInUser
}


// get all user info
router.get("/", (req, res) => {
    db.User.findAll().then(dbUsers => {
        res.json(dbUsers);
    }).catch(err => {
        // console.log(err);
        res.status(500).end();
    })
})

// create new user
router.post('/', ({ body },res) => {
    db.User.create(body)
    .then(dbNewUser => {
        res.status(200).send(dbNewUser)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

// update user info
router.put('/:id', ({ body, params }, res) => {
    const userId=params.id
    db.User.update(body,{
        where:{
            id: userId
        }
    }).then(dbResult => res.json(dbResult))
    .catch(err => console.log(err))

})

// user login
router.post("/login", (req, res) => {
    db.User
        .findOne({
            where: {
                username: req.body.username
            }
        })
        .then((dbUser) => {
            if (!dbUser) {
                res.status(404).send('could not find user');
            }
            if (bcrypt.compareSync(req.body.password, dbUser.password)) {
                const userTokenInfo = {
                    username: dbUser.email,
                    id: dbUser.id,
                    email: dbUser.email,
                    leftEar: dbUser.leftEar,
                    rightEar: dbUser.rightEar
                }
                const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET, { expiresIn: "2h" });
                return res.status(200).json({ token: token })
            } else {

                res.status(403).send('username and password did not match!');
            }
        })
        .catch(err => console.log(err));
})

// secret route to retrieve single user info
router.get('/secretProfile', (req,res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("invalid token")
    }
    db.User.findOne({
        where: {
            id: loggedInUser.id
        },
    }).then(dbUser => {
        res.json(dbUser)
    }).catch(err => {
        res.status(500).send("an error occured please try again later");
    })
})



module.exports = router