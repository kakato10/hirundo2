'use strict';

const express = require('express');
const router = express.Router();
const settingsProjections = require('../services/projections').settings;
const endpoint = '/api/settings';
const Helper = require('../services/helpers');


function _updateOrCreate(req, res) {
    return Helper.findModelInstanceByUser(req.app.locals.Settings, req.user._id)
        .then((settings) => {
            const data = {
                userId: req.user._id,
                ...req.body
            };
            const errors = req.app.locals.schemator.validateSync('Settings', data);

            if (errors) {
                res.status(403).send(errors);
                return;
            }

            if (settings && settings.length) {
                return req.app.locals.Settings.update(settings[0]._id, req.body);
            } else {
                return req.app.locals.Settings.create(data);
            }
        });
}

router.get(`${endpoint}`, (req, res) => {
    Helper.findModelInstanceByUser(req.app.locals.Settings, req.user._id)
        .then(settings => {
            res.send({
                settings: Helper.applyProjectionOnEntity(settings[0], settingsProjections.basic)
            });
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        });
});

router.post(`${endpoint}/theme`, (req, res) => {
    _updateOrCreate(req, res)
        .then((settings) => {
            res.status(200).send({
                settings: Helper.applyProjectionOnEntity(settings, settingsProjections.basic)
            });
        })
        .catch(e => {
            res.status(500);
        })
});

router.post(`${endpoint}/language`, (req, res) => {
    _updateOrCreate(req, res)
        .then((settings) => {
            res.status(200).send({
                settings: Helper.applyProjectionOnEntity(settings, settingsProjections.basic)
            });
        })
        .catch(e => {
            res.status(500);
        })
});

module.exports = router;
