module.exports = {
    user: {
        basic: {
            id: true,
            username: true,
            email: true,
            followedUsers: true
        }
    },
    post: {
        basic: {
            id: true,
            authorUsername: true,
            authorId: true,
            content: true,
            likes: true
        }
    },
    comment: {
        basic: {
            id: true,
            authorId: true,
            authorUsername: true,
            content: true,
        }
    }
};