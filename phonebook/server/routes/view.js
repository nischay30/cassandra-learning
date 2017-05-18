const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const client = require(path.join(__dirname, '..', 'connection'));

module.exports = ((req, res) => {
	selectAll(req, res);
});

function selectAll(req, res) {
	const query = 'SELECT * FROM '+config.tableName;
	client.execute(query, [], {prepare: true}, (err, results) => {
		if(err) { res.status(500).send({error: 'May be Table didn\'t exists in the database' }); return; }
		res.json(results.rows);
	});
}
