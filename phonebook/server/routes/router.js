const Router = require('express').Router();

const add = require('./add');
const view = require('./view');
const search = require('./search');
const deletion = require('./delete');
const update = require('./update');

Router.use(require('body-parser').json());

Router.get('/ping', (req, res) => {
	console.log('Testing');
	res.sendStatus(200);
});

Router.post('/add', add);
Router.get('/view', view);
Router.get('/search/:name', search);
Router.get('/delete/:name', deletion, view);
Router.post('/update', update, view);

module.exports = Router;