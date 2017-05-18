const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const client = require(path.join(__dirname, '..', 'connection'));

module.exports = ((req, res, next)=> {
	deleteEntry(req, res, next);
});

function deleteEntry(req, res, next) {
	const query = 'DELETE FROM '+config.tableName+' where name=?';
	const params = [req.params.name];
	client.execute(query, params, {prepare: true}, (err, results) => {
	if(err) { console.log(err); res.status(500).send({error: 'May be Table didn\'t exists in the database' }); return; }
		next();
	});
}