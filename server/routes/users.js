'use strict';

const express = require('express');
const router = express.Router();
const attachBasicListeners = require('./basicListeners');

const CLREndpoint = '/api/users';
const ILREndpoint = `${CLREndpoint}/:id`;

attachBasicListeners(router, {
    CLREndpoint,
    ILREndpoint,
    resourceName: 'User'
});

module.exports = router;