const Helpers = require('../services/helpers');

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

        res.send(entity);
    }

    router.get(CLREndpoint, (req, res) => {
        let query;

        if (filters && filters.getCLR) {
            query = filters.getCLR(req)
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
            res.status(500).send(e);
        });
    });

    if (permissions.post) {
        router.post(CLREndpoint, (req, res) => {
            if (!req.body) {
                return res.status(400).send('No data provided!');
            }

            const data = req.body;
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