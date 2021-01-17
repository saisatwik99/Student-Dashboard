const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('This is a get route, ====> We are driving a car (Set a offer)');
});

module.exports = router;