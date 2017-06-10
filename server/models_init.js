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

module.exports = (app) => {
	app.locals.DS = DS;
	app.locals.Post = registerPost(DS);
};