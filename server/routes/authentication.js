'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();
const _ = require('lodash');
const LocalStrategy = require('../services/local_strategy');

const base = '/api/auth';
const endpoint = `${base}/login`;

const Helpers = require('../services/helpers');
const projections = require('../services/projections');

function _sendUser(req) {
    res.send({
        user: Helpers.applyProjectionOnEntity(req.user,
            projections.user.basic)
    });
}

passport.use(LocalStrategy);

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(req, id, done) {
    req.app.locals.User.find(id)
        .then((user) => {
            done(null, user);
        });
});


router.post(endpoint,
    passport.authenticate('local'),
    (req, res) => {
        _sendUser(req);
    });

router.get(`${base}/authenticate`, (req, res) => {
    _sendUser(req);
});

module.exports = router;