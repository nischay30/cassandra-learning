const cassandra = require('cassandra-driver');
const config = require('./config');

const userName = config.userName;
const password = config.dbPassword;
const keySpace = config.keySpace;
const hosts = config.hosts.split(',');

const authProvider = new cassandra.auth.PlainTextAuthProvider(userName, password);
const client = new cassandra.Client({ contactPoints: hosts, keyspace: keySpace, authProvider: authProvider });

function createConnection() {
	client.connect((err, res) => {
		if(err) { console.log('Err:', err); createConnection(); return; }
		console.log('Cassandra is connected with configuration', config);
	});
}

createConnection();
module.exports = client;
