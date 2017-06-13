'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();
const _ = require('lodash');

const LocalStrategy = require('../services/local_strategy');

const endpoint = '/api/auth/login';

passport.use(LocalStrategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(req, id, done) {
    req.locals.User.find(id, function(err, user) {
        done(err, user);
    });
});

router.post(endpoint,
    passport.authenticate('local'),
    (req, res) => {
        res.send({
            user: _.omit(req.user, ['password'])
        });
    });

module.exports = router;