'use strict';

const express = require('express');
const router = express.Router();
const attachBasicListeners = require('./basicListeners');
const userProjections = require('../services/projections').user;
const CLREndpoint = '/api/users';
const ILREndpoint = `${CLREndpoint}/:id`;

attachBasicListeners(router, {
    CLREndpoint,
    ILREndpoint,
    resourceName: 'User'
}, userProjections.basic);

module.exports = router;