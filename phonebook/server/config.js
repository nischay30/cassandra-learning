module.exports = {
	  userName: process.env.CASSANDRA_USER_NAME || 'nischay',
		dbPassword: process.env.CASSANDRA_PASSWORD || 'admin',
		keySpace: process.env.KEYSPACE || 'usersks',
		tableName: process.env.TABLENAME || 'phonebook4',
		hosts: process.env.HOSTS || ['localhost']
}