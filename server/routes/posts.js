'use strict';

const express = require('express');
const router = express.Router();
const attachBasicListeners = require('./basicListeners');
const postsProjections = require('../services/projections').post;
const Helpers = require('../services/helpers');
const CLREndpoint = '/api/posts';
const ILREndpoint = `${CLREndpoint}/:id`;

router.get(`${CLREndpoint}/own`, (req, res) => {
    req.app.locals.Post.findAll({
        where: {
            authorId: {
                '===': req.user._id
            }
        }
    })
        .then(posts => {
            res.send(Helpers.applyProjectionOnCollection(posts, postsProjections.basic));
        })
});

attachBasicListeners(router, {
    CLREndpoint,
    ILREndpoint,
    resourceName: 'Post'
}, postsProjections.basic, {
    getCLR: req => {
        const followedUsers = req.user.followedUsers || [];

        return {
            where: {
                authorId: {
                    in: followedUsers
                }
            }
        };
    },
    getCLRWithQuery: req => {
        return {
            where: {
                hashtags: {
                    contains: req.query.hashtag
                }
            }
        };
    }
});

module.exports = router;