
//import data connection
var sql=require('../config/sql');

//import functions
var functions=require('../functions/functions');
var dateFormat = require('dateformat');

const get = async function(obj,callback){
	
	var qry="SELECT * FROM	talla ";
	
	sql.execSqlQuery(qry,callback);
}

module.exports.get = get;

const insertTalla = async function(data,callback){
	var qry = "INSERT INTO ezapatillas.talla (nombre, descripcion, Activo) VALUES ('"+ data.nombre + "','" + data.descripcion + "', " + data.Activo +")";
	try{
		sql.execSqlQuery(qry,callback);	
	}catch(ex){
		console.log(ex);
	}
	
}
module.exports.insertTalla = insertTalla;

const updateTalla = async function(data,callback){
	sql.updateObject(data,'talla',callback);
}
module.exports.updateTalla = updateTalla;


