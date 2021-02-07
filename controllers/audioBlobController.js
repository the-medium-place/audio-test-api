const express = require("express");
const router = express.Router();
const db = require("../models");
const cloudinary = require('cloudinary').v2

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config()


cloudinary.config({
    // cloudinary_url: process.env.CLOUDINARY_URL
    cloud_name: 'zgscloud',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// // GET ALL CLOUDINARY RESOURCES
// cloudinary.api.resources((err, res) => {
//     console.log(res)
// })

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

    const saveObj = {
        audioURL: body.audioURL,
        recordingName: body.recordingName,
        cloudinaryId: body.cloudinaryId,
        UserId: id,
        audioBlob: body.audioBlob
    }

    db.AudioBlob.create(saveObj)
        .then((dbBlob) => {
            console.log(dbBlob)
        })
    // const options = {
    //     resourse_type: 'video'
    // }

    // cloudinary.uploader.upload(body.audioFile, options, (err, res) => {
    //     if(err) console.log(err)
        
    //     console.log(res)
    // })

})

// delete audioBlob
router.delete('/delete/:id', (req, res) => {
    db.AudioBlob.destroy({
        where: {
            id: req.params.id
        }
    })
})


module.exports = router