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
            likes: true,
            hashtags: true
        }
    }
};