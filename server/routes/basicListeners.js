module.exports = (router, {
        CLREndpoint, ILREndpoint, resourceName,
        permissions = {
            put: true,
            post: true,
            delete: true
        }}) => {

    router.get(CLREndpoint, (req, res) => {
        req.app.locals[resourceName].findAll().then((entities) => {
            res.send(entities);
        });
    });

    router.get(ILREndpoint, (req, res) => {
        const entityId = req.params.id;

        req.app.locals[resourceName].find(entityId).then((entity) => {
            res.send(entity);
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

            req.app.locals[Resource].update(entityId, updateDate).then((entity) => {
                res.send(entity);
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