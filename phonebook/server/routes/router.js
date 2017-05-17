const Router = require('express').Router();

const add = require('./add');

Router.use(require('body-parser').json());

Router.get('/ping', (req, res) => {
	console.log('Testing');
	res.sendStatus(200);
});

Router.post('/add', add);

module.exports = Router;