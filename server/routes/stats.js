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

function getTrendingHashtags(posts) {
    const hashtagsCounters = {};

    posts.forEach(p => {
        if (p.hashtags && p.hashtags.length) {
            p.hashtags.forEach(h => {
               if (hashtagsCounters[h]) {
                   hashtagsCounters[h]++;
               } else {
                   hashtagsCounters[h] = 1;
               }
            });
        }
    });

    const pairs = _.toPairs(hashtagsCounters);

    pairs.sort((a, b) => b[1] - a[1]);

    return {
        trendingHashtags: pairs.slice(0, 5).map(p => p[0])
    };
}

router.get(`${CLREndpoint}`, (req, res) => {
    req.app.locals.Post.findAll({})
        .then(posts => {
            res.send(getStats(posts));
        });
});

router.get(`${CLREndpoint}/trending`, (req, res) => {
    req.app.locals.Post.findAll({})
        .then(posts => {
            res.send(getTrendingHashtags(posts));
        });
});

module.exports = router;
