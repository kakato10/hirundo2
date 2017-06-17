'use strict';

const express = require('express');
const router = express.Router();

const attachBasicListeners = require('./basicListeners');
const projections = require('../services/projections');
const Helpers = require('../services/helpers');

const CLREndpoint = '/api/users';
const ILREndpoint = `${CLREndpoint}/:id`;

attachBasicListeners(router, {
    CLREndpoint,
    ILREndpoint,
    resourceName: 'User'
}, projections.user.basic);

router.post(`${CLREndpoint}/follow`, (req, res) => {
    if (!req.body || !req.body.userId) {
        return res.status(400).send('No data provided!');
    }

    req.app.locals.User.find(req.user.id)
        .then(user => {
            if (user.followedUsers) {
                user.followedUsers.push(req.body.userId);
            } else {
                user.followedUsers = [req.body.userId];
            }

            req.app.locals.User.update(user.id, user)
                .then(user => {
                    res.send(Helpers.applyProjectionOnEntity(user,
                        projections.user.basic));
                });
        });
});

router.post(`${CLREndpoint}/unfollow`, (req, res) => {
    if (!req.body || !req.body.userId) {
        return res.status(400).send('No data provided!');
    }

    req.app.locals.User.find(req.user.id)
        .then(user => {
            if (user.followedUsers) {
                user.followedUsers = user.followedUsers.filter((userId) => {
                    return userId !== req.body.userId
                });

                req.app.locals.User.update(user.id, user)
                    .then(user => {
                        res.send(Helpers.applyProjectionOnEntity(user,
                            projections.user.basic));
                    });
            }
        });
});

router.post(`${CLREndpoint}/like`, (req, res) => {
    if (!req.body || !req.body.postId) {
        return res.status(400).send('No data provided!');
    }

    req.app.locals.Post.find(req.body.postId)
        .then(post => {
            if (post.likes) {
                post.likes.push(req.user.id);
            } else {
                post.likes = [req.user.id];
            }

            req.app.locals.Post.update(post.id, post)
                .then(post => {
                    res.send(Helpers.applyProjectionOnEntity(post,
                        projections.post.basic));
                });
        });

});

module.exports = router;