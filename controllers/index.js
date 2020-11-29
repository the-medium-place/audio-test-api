const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');
const blobRoutes = require('./audioBlobController');

router.get('/', (req,res) => {
    res.send('api plash');
})



router.use('/api/users', userRoutes)
router.use('/api/blobs', blobRoutes)

module.exports = router