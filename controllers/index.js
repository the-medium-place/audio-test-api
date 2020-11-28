const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');

router.get('/', (req,res) => {
    res.send('api plash');
})



router.use('/api/users', userRoutes)

module.exports = router