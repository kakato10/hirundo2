'use strict';

const express = require('express');
const router = express.Router();
const CLREndpoint = '/api/stats';
const _  = require('lodash');

function getStats(posts) {
    const stats = {
        posts: {
            total: posts.length,
            hashtags: {}
        }
    };
    let withHashTags = 0;

    posts.forEach(post => {
        if (post.hashtags && post.hashtags.length) {
            post.hashtags.forEach(hashtag => {
                let number = stats.posts.hashtags[hashtag] || 0;

                stats.posts.hashtags[hashtag] = number + 1;
                withHashTags++;
            });
        }
    });

    stats.posts.noHashTags = posts.length - withHashTags;
    stats.posts.withHashTags = withHashTags;

    return stats;
}

router.get(`${CLREndpoint}`, (req, res) => {
    req.app.locals.Post.findAll({})
        .then(posts => {
            res.send(getStats(posts));
        });
});

module.exports = router;
