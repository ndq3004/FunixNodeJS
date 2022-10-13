var express = require('express');

const router = express.Router();

router.use('/', (req, res, next) => {
    console.log('this is middleware');
    next();
});

module.exports = router;