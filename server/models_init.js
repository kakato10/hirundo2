// js-data setup
const jsData = require('js-data');
const { MongoDBAdapter } = require('js-data-mongodb');

const mongoAdapter = new MongoDBAdapter({
    uri: 'mongodb://127.0.0.1:27017/hirundo'
});

const DS = new jsData.DS({
    cacheResponse: false,
    idAttribute: '_id',
    beforeUpdate: (resource, data, cb) => {
        const {_id, ...restProps} = data;

        cb(null, restProps);
    }
});

DS.registerAdapter('mongoAdapter', mongoAdapter, { default: true });

const registerPost = require('./models/post');
const registerUser = require('./models/user');
const registerLike = require('./models/like');
const registerComment = require('./models/comment');
const schemator = require('./services/schemator');

module.exports = (app) => {
	app.locals.DS = DS;
	app.locals.schemator = schemator;
	app.locals.Post = registerPost(DS, schemator);
    app.locals.User = registerUser(DS, schemator);
    app.locals.Like = registerLike(DS, schemator);
    app.locals.Comment = registerComment(DS, schemator);
};