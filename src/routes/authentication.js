const express = require('express');
const { get } = require('.');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggeIn }= require('../lib/auth');

router.get('/signup', isNotLoggeIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggeIn, passport.authenticate( 'local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));
    
router.get('/signin', isNotLoggeIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggeIn,  (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: 'profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;