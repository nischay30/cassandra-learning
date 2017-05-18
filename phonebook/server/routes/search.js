const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const client = require(path.join(__dirname, '..', 'connection'));

module.exports = ((req, res) => {
	searchByName(req, res);
});

function searchByName(req, res) {
	const query = 'SELECT * FROM '+config.tableName + ' where name=?';
	client.execute(query, [req.params.name], {prepare: true}, (err, results) => {
		if(err) { console.log(err); res.status(500).send({error: 'Something Failed'}); return; }
		res.json(results.rows);
	});
}
