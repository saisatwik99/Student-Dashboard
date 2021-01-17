const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('This is login page');
});

module.exports = router;