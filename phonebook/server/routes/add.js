const path = require('path');
const uuid = require('cassandra-driver').types.Uuid;
const config = require(path.join(__dirname, '..', 'config'));
const client = require(path.join(__dirname, '..', 'connection'));

module.exports = ((req, res) => {
	insertData(req, res);
});

function insertData (req, res) {
	const query = 'INSERT INTO '+config.tableName+' (id, name, city, dob, gender, mobile) values(?,?,?,?,?,?)';
	const params = [uuid.random(),req.body.name, req.body.city, req.body.DOB, req.body.gender, req.body.mobile];
	client.execute(query, params, {prepare: true}, (err,result) => { 
		if(err) {
			// check whether the table exits or not
			if(err.code === 8704) {
				createTable(req, res);
			} else {
			 res.status(500).send({error: 'Something Failed'}); return; 
			}
		} else {
			res.send('OK');
		}
	});
}

// will create a table
function createTable(req, res) {
	const query = `CREATE TABLE `+config.tableName+ `(ID UUID PRIMARY KEY,` +  
		`NAME TEXT, CITY TEXT, dob DATE, GENDER TEXT, MOBILE BIGINT)`;
	client.execute(query, [], {prepare: true}, (err, result) => {
		if(err) {console.log(err); res.status(500).send({error: 'Something Failed'}); return; }
		insertData(req, res);
	});
}
