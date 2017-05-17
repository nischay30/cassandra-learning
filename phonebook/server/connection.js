const cassandra = require('cassandra-driver');
const config = require('./config');

const userName = config.userName;
const password = config.dbPassword;
const keySpace = config.keySpace;
const hosts = config.hosts

const authProvider = new cassandra.auth.PlainTextAuthProvider(userName, password);
const client = new cassandra.Client({ contactPoints: hosts, keyspace: keySpace, authProvider: authProvider });

client.connect((err, res) => {
	if(err) { console.log('Err:', err); return; }
	console.log('Cassandra is connected with configuration', config);
});

module.exports = client;
