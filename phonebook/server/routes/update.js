const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const client = require(path.join(__dirname, '..', 'connection'));

module.exports = ((req, res, next) => {
	updateEntry(req, res, next);
});

function updateEntry(req, res, next) {
	const query = 'UPDATE '+config.tableName+' SET CITY=? , GENDER=?, DOB=?, MOBILE=? WHERE NAME=?';
	const params = [req.body.city, req.body.gender, req.body.DOB, req.body.mobile, req.body.name];
	client.execute(query, params, {prepare: true},(err, results) => {
		if(err) {console.log(err); res.status(500).send({error: 'Something Failed'}); return; }
		next();
	});
}