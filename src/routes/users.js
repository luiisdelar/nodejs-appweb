const express = require('express');
const router = express.Router();

router.get('/users/signin', function(req, res){
    res.render('users/signin');
});

router.get('/users/signup', function(req, res){
    res.render('users/signup');
});

module.exports = router;