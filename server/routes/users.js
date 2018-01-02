'use strict';

const express = require('express');
const router = express.Router();
const _ = require('lodash');

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

function updatePost(req, res, post) {
    return req.app.locals.Post.update(post._id, post)
        .then(post => {
            res.send(Helpers.applyProjectionOnEntity(post,
                projections.post.basic));
        });
}

router.post(`${CLREndpoint}/follow`, (req, res) => {
    if (!req.body || !req.body.userId) {
        return res.status(400).send('No data provided!');
    }

    req.app.locals.User.find(req.user._id)
        .then(user => {
            if (user.followedUsers) {
                user.followedUsers.push(req.body.userId);
            } else {
                user.followedUsers = [req.body.userId];
            }

            const errors = req.app.locals.schemator.validateSync('User', user);

            if (errors) {
                res.status(403).send(errors);
                return;
            }

            req.app.locals.User.update(user._id, user)
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

    req.app.locals.User.find(req.user._id)
        .then(user => {
            if (user.followedUsers) {
                user.followedUsers = user.followedUsers.filter((userId) => {
                    return userId !== req.body.userId
                });

                const errors = req.app.locals.schemator.validateSync('User', user);

                if (errors) {
                    res.status(403).send(errors);
                    return;
                }

                req.app.locals.User.update(user._id, user)
                    .then(user => {
                        res.send(Helpers.applyProjectionOnEntity(user,
                            projections.user.basic));
                    });
            } // TODO - error handler
        });
});

router.post(`${CLREndpoint}/like`, (req, res) => {
    if (!req.body || !req.body.postId) {
        return res.status(400).send('No data provided!');
    }

    req.app.locals.Post.find(req.body.postId)
        .then(post => {
            if (post.likes) {
                post.likes.push(req.user._id);
            } else {
                post.likes = [req.user._id];
            }

            const errors = req.app.locals.schemator.validateSync('Post', post);

            if (errors) {
                res.status(403).send(errors);
                return;
            }

            updatePost(req, res, post);
        });

});

router.post(`${CLREndpoint}/dislike`, (req, res) => {
    if (!req.body || !req.body.postId) {
        return res.status(400).send('No data provided!');
    }

    req.app.locals.Post.find(req.body.postId)
        .then(post => {
            if (post.likes) {
                post.likes = _.filter(post.likes,
                    uid => uid !== req.user._id);

                const errors = req.app.locals.schemator.validateSync('Post', post);

                if (errors) {
                    res.status(403).send(errors);
                    return;
                }

                updatePost(req, res, post);
            } // TODO - error handler
        });

});

module.exports = router;