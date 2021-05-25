
//import data connection
var sql=require('../config/sql');

//import functions
var functions=require('../functions/functions');
var dateFormat = require('dateformat');

const get = async function(obj,callback){
	
	var qry="SELECT * FROM	colores ";
	
	sql.execSqlQuery(qry,callback);
}

module.exports.get = get;

const insertColor = async function(data,callback){
	var qry = "INSERT INTO ezapatillas.colores (nombre, hex, Activo) VALUES ('"+ data.nombre + "','" + data.hex + "', " + data.Activo +")";
	try{
		sql.execSqlQuery(qry,callback);	
	}catch(ex){
		console.log(ex);
	}
	
}
module.exports.insertColor = insertColor;

const updateColor = async function(data,callback){
	sql.updateObject(data,'colores',callback);
}
module.exports.updateColor = updateColor;


