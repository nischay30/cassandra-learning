const express = require('express');
const app = express();
const path = require('path');
const port = process.env.EXPRESS_PORT || 8080;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, Accept");
	next();
});

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(require(path.join(__dirname, 'routes')));
require(path.join(__dirname, 'connection'));

app.listen(port, () => {
	console.log('Express Server is Started', port);
});
