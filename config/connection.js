const constant=require('./constEnv');
//mysql connection
var connection={ 
		host: constant.HOST, //ip server mysql
		user: constant.USER,  //user server mysql
		password: constant.PASSWORD,  //pwd server mysql
		database: constant.NAME,  //database
};

module.exports = connection;

