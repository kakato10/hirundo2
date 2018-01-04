'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();
const _ = require('lodash');
const LocalStrategy = require('../services/local_strategy');

const base = '/api/auth';
const endpoint = `${base}/login`;

const Helper = require('../services/helpers');
const projections = require('../services/projections');

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
        Helper.findModelInstanceByUser(req.app.locals.Settings, req.user._id)
            .then(settings => {
                const userSettings = settings && settings.length
                    ? settings[0]
                    : {};

                res.send({
                    user: Helper.applyProjectionOnEntity(req.user,
                        projections.user.basic),
                    settings: Helper.applyProjectionOnEntity(userSettings, projections.settings.basic)
                });
            });
        });

module.exports = router;