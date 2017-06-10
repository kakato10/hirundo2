'use strict';
const express = require('express');
const router = express.Router();

// common endpoints
const CLRPostsEndpoint = '/api/posts';
const ILRPostEndpoint = `${CLRPostsEndpoint}/:id`;

router.get(CLRPostsEndpoint, (req, res) => {
	req.app.locals.Post.findAll().then((posts) => {
		res.send(posts);
	});
});

router.post(CLRPostsEndpoint, (req, res) => {
	if (!req.body || !req.body.post) { 
		return res.status(400).send('No Post data provided!');
	}

	const post = req.body.post;
 	
 	req.app.locals.Post.create(post).then((post) => {
 		res.status(201).send({
 			location: `/api/posts/${post.id}`
 		});
 	}, (e) => {
 		res.status(500).send(e);
 	});
});

router.get(ILRPostEndpoint, (req, res) => {
	const postId = req.params.id;

	req.app.locals.Post.find(postId).then((post) => {
		res.send(post);
	}, (e) => {
 		res.status(500).send(e);
	});
});

router.put(ILRPostEndpoint, (req, res) => {
	if (!req.body || !req.body.post) {
		return res.status(400).send('No Post data provided!');
	}

	const postId = req.params.id;
	const post = req.body.post;

	req.app.locals.Post.update(postId, post).then((post) => {
		res.send(post);
	}, (e) => {
 		res.status(500).send(e);
	});
});

router.delete(ILRPostEndpoint, (req, res) => {
	const postId = req.params.id;

	req.app.locals.Post.destroy(postId).then(() => {
		res.sendStatus(200);
	}, (e) => {
 		res.status(500).send(e);
	});
});


module.exports = router;