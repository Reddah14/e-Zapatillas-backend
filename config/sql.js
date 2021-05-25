var constant=require('./constEnv');
//mysql module
var mysql = require('mysql');

const execSqlQuery = async function(qry,callback){
	var connection=mysql.createConnection({
		host: constant.HOST, //ip server mysql
		user: constant.USER,  //user server mysql
		password: constant.PASSWORD,  //pwd server mysql
		database: constant.NAME,  //database
  });
	
		connection.query(qry, function(error, rows) {
			if(error)
			{
				
				callback(null,error);
			}
			else
			{
				callback(null, rows);
			}
			connection.end();
			console.log(new Date().toLocaleTimeString()+' '+qry);
		});
	
}

module.exports.execSqlQuery = execSqlQuery;

const execSqlQuerySaveData = async function(qry,obj,callback){
	var connection=mysql.createConnection({
		host: constant.HOST, //ip server mysql
		user: constant.USER,  //user server mysql
		password: constant.PASSWORD,  //pwd server mysql
		database: constant.NAME,  //database
  });
	
		connection.query(qry, function(error, rows) {
			if(error)
			{
				
				callback(null,error,obj);
			}
			else
			{
				callback(null, rows,obj);
			}
			connection.end();
			console.log(new Date().toLocaleTimeString()+' '+qry);
		});
	
}

module.exports.execSqlQuerySaveData = execSqlQuerySaveData;

const insertObject = async function(obj,table,callback){
	var connection=mysql.createConnection({
		host: constant.HOST, //ip server mysql
		user: constant.USER,  //user server mysql
		password: constant.PASSWORD,  //pwd server mysql
		database: constant.NAME,  //database
	 });

	
	obj=deleteKeysUndefined(obj,function(error,data){
		var query=connection.query('INSERT INTO '+table+' SET ?', obj, function(error, rows) {
			if(error){
				callback(null,error);
			}else{
				callback(null, rows);
			}
			console.log(new Date().toLocaleTimeString()+' '+query.sql);
			connection.end();
		});
	});
}

module.exports.insertObject = insertObject;

const updateObject = async function(obj,table,callback){
	var connection=mysql.createConnection({
		host: constant.HOST, //ip server mysql
		user: constant.USER,  //user server mysql
		password: constant.PASSWORD,  //pwd server mysql
		database: constant.NAME,  //database
	 });
	 obj=deleteKeysUndefined(obj,function(error,data){
		var query=connection.query('update '+table+' SET ? where id='+obj.id, obj, function(error, rows) {
			if(error){
				callback(null,error);
			}else{
				callback(null, rows);
			}
			console.log(new Date().toLocaleTimeString()+' '+query.sql);
			connection.end();
		});
	 });
}

module.exports.updateObject = updateObject;


const updateTable = async function(obj,table,callback){

	var connection=mysql.createConnection({
		host: constant.HOST, //ip server mysql
		user: constant.USER,  //user server mysql
		password: constant.PASSWORD,  //pwd server mysql
		database: constant.NAME,  //database
	 });
	 obj=deleteKeysUndefined(obj,function(error,data){
		var query=connection.query('update '+table+' SET ? ', obj, function(error, rows) {
			if(error){
				callback(null,error);
			}else{
				callback(null, rows);
			}
			console.log(new Date().toLocaleTimeString()+' '+query.sql);
			connection.end();
		});
	 });
}

module.exports.updateTable = updateTable;

var deleteKeysUndefined=function(obj,callback){
	var keys=[];
	for (var prop in obj) {
		if(obj[prop]==undefined){
			delete obj[prop];
		}
    }
	callback (null,obj);
}

module.exports.deleteKeysUndefined = deleteKeysUndefined;

