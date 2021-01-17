const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('This is a get route, ====>  Give a car');
});

module.exports = router;