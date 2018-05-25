module.exports = {
    user: {
        basic: {
            _id: true,
            username: true,
            email: true,
            followedUsers: true
        }
    },
    post: {
        basic: {
            _id: true,
            authorUsername: true,
            authorId: true,
            content: true,
            likes: true,
            hashtags: true
        }
    },
    comment: {
        basic: {
            _id: true,
            authorId: true,
            authorUsername: true,
            content: true,
        }
    },
    settings: {
        basic: {
            theme: true,
            language: true
        }
    }
};