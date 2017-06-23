const Helpers = require('../services/helpers');
const _ = require('lodash');

module.exports = (router, {
        CLREndpoint, ILREndpoint, resourceName,
        permissions = {
            put: true,
            post: true,
            delete: true
        }}, projection, filters) => {

    function sendEntity(res, entity) {
        if (projection) {
            entity = Helpers.applyProjectionOnEntity(entity, projection);
        }

        console.log(entity);

        res.send(entity);
    }

    router.get(CLREndpoint, (req, res) => {
        let query;

        if (_.keys(req.query).length && filters && filters.getCLRWithQuery) {
            query = filters.getCLRWithQuery(req);
        } else if (filters && filters.getCLR) {
            query = filters.getCLR(req);
        }

        req.app.locals[resourceName].findAll(query).then((entities) => {
            if (projection) {
                entities = Helpers.applyProjectionOnCollection(entities, projection);
            }

            res.send(entities);
        });
    });

    router.get(ILREndpoint, (req, res) => {
        const entityId = req.params.id;

        req.app.locals[resourceName].find(entityId).then((entity) => {
            sendEntity(res, entity);
        }, (e) => {
            console.log(e);

            res.status(500).send(e);
        });
    });

    if (permissions.post) {
        router.post(CLREndpoint, (req, res) => {
            if (!req.body) {
                return res.status(400).send('No data provided!');
            }

            let data = req.body;

            if (filters && filters.postCLR) {
                data = filters.postCLR(data, req);
            }

            const errors = req.app.locals.schemator.validateSync(resourceName, data);

            if (errors) {
                res.status(403).send(errors);
                return;
            }

            req.app.locals[resourceName].create(data).then((entity) => {
                res.status(201).send({
                    location: `${CLREndpoint}/${entity.id}`
                });
            }, (e) => {
                res.status(500).send(e);
            });
        });
    }

    if (permissions.put) {
        router.put(ILREndpoint, (req, res) => {
            if (!req.body) {
                return res.status(400).send('No data provided!');
            }

            const entityId = req.params.id;
            const updateDate = req.body;
            const errors = req.app.locals.schemator.validateSync(resourceName, updateDate);

            if (errors) {
                res.status(403).send(errors);
                return;
            }

            req.app.locals[Resource].update(entityId, updateDate).then((entity) => {
                sendEntity(res, entity);
            }, (e) => {
                res.status(500).send(e);
            });
        });
    }

    if (permissions.delete) {
        router.delete(ILREndpoint, (req, res) => {
            const entityId = req.params.id;

            req.app.locals[resourceName].destroy(entityId).then(() => {
                res.sendStatus(200);
            }, (e) => {
                res.status(500).send(e);
            });
        });
    }
};