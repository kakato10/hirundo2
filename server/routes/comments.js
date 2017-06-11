'use strict';

const express = require('express');
const router = express.Router();
const attachBasicListeners = require('./basicListeners');

const CLREndpoint = '/api/comments';
const ILREndpoint = `${CLREndpoint}/:id`;

attachBasicListeners(router, {
    CLREndpoint,
    ILREndpoint,
    resourceName: 'Comment'
});

module.exports = router;