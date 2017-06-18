'use strict';

const express = require('express');
const router = express.Router();
const attachBasicListeners = require('./basicListeners');
const postsProjections = require('../services/projections').post;
const CLREndpoint = '/api/posts';
const ILREndpoint = `${CLREndpoint}/:id`;

attachBasicListeners(router, {
    CLREndpoint,
    ILREndpoint,
    resourceName: 'Post'
}, postsProjections.basic, {
    getCLR: req => {
        return {
            where: {
                authorId: {
                    in: req.user.followedUsers
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