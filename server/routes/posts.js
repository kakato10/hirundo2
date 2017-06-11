'use strict';

const express = require('express');
const router = express.Router();
const attachBasicListeners = require('./basicEndpoint');

const CLREndpoint = '/api/posts';
const ILREndpoint = `${CLREndpoint}/:id`;

attachBasicListeners(router, {
    CLREndpoint,
    ILREndpoint,
    resourceName: 'Post'
});

module.exports = router;