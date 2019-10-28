const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', function(req, res){
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', async function(req, res){
    res.render('users/signup');
});

router.post('/users/signup', async function(req, res){
    const { name, email, password, confirm_pass } = req.body;
    const errors = [];

    if(name.length <=0 || email.length <=0){
        error.push({ text: 'There can be no empty fields'});
    }
    if(password != confirm_pass){
        errors.push({ text: 'Password do not match' });
    }
    if(password.length < 4){
        errors.push({ text: 'Password must be at least 4 characteres' });
    }
    if(errors.length > 0){
        res.render('users/signup', { errors, name, email, password, confirm_pass });
    }else{
        const emailUser = await User.findOne({ email: email });

        if(emailUser){
            req.flash('error_msg', 'The Email is already in use');
            res.redirect('/users/signup');
        }

        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', function (req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;