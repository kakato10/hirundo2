// js-data setup
const jsData = require('js-data');
const Firebase = require('firebase');
const firebaseAdapter = require('js-data-firebase');

const adapter = new firebaseAdapter({
  basePath: 'https://hirundo-aa312.firebaseio.com/'
});

const DS = new jsData.DS();

DS.registerAdapter('firebase', adapter, { default: true });

const registerPost = require('./models/post');
const registerUser = require('./models/user');
const registerLike = require('./models/like');

module.exports = (app) => {
	app.locals.DS = DS;
	app.locals.Post = registerPost(DS);
    app.locals.User = registerUser(DS);
    app.locals.Like = registerLike(DS);
};