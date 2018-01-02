'use strict';

const express = require('express');
const _ = require('lodash');

const router = express.Router();

const commentProjections = require('../services/projections').comment;
const attachBasicListeners = require('./basicListeners');

const CLREndpoint = '/api/comments';
const ILREndpoint = `${CLREndpoint}/:id`;

attachBasicListeners(router, {
    CLREndpoint,
    ILREndpoint,
    resourceName: 'Comment'
}, commentProjections.basic, {
    getCLRWithQuery: (req) => {
        return {
            where: {
                postId: {
                    '===': req.query.postId
                }
            }
        }
    },
    postCLR: (post, req) => {
        return _.assign({}, post, {
            authorId: req.user._id,
            authorUsername: req.user.username
        });
    }
});

module.exports = router;