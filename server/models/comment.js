module.exports = (DS, schemator) => {
    schemator.defineSchema('Comment', {
        id: 'id',
        authorUsername: 'string',
        authorId: 'string',
        content: 'string',
        postId: 'string'
    });

    return DS.defineResource('comment');
};

