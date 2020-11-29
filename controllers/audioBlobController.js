const express = require("express");
const router = express.Router();
const db = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


// save audioBlob with reference to user ID
router.post('/:id', ({ body, params }, res) => {
    console.log(body)
    const { id } = params;
    body.UserId = id;
    db.AudioBlob.create(body)
    .then((dbBlob) => {
        console.log(dbBlob)
    })
})


module.exports = router