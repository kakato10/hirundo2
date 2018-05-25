module.exports = (DS, schemator) => {
    schemator.defineSchema('Settings', {
        _id: 'id',
        userId: 'string',
        theme: 'string',
        language: 'string'
    });

    return DS.defineResource('settings');
};