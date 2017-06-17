module.exports = (DS, schemator) => {
    schemator.defineSchema('User', {
            id: 'id',
            username: 'string',
            email: 'string',
            password: 'string',
            followedUsers: 'arrayOfStrings'
        }
    );

    return DS.defineResource('user');
};