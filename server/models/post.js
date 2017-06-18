module.exports = (DS, schemator) => {
    schemator.defineSchema('Post', {
        id: 'id',
        authorUsername: 'string',
        authorId: 'string',
        content: 'string',
        likes: 'arrayOfStrings',
        hashtags: 'arrayOfStrings'
    });

    return DS.defineResource('post');
};