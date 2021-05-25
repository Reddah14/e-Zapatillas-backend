
//import data connection
var sql=require('../config/sql');

//import functions
var functions=require('../functions/functions');
var dateFormat = require('dateformat');

const get = async function(obj,callback){
	
	var qry="SELECT * FROM	marcas ";
	
	sql.execSqlQuery(qry,callback);
}

module.exports.get = get;

const insertMarca = async function(data,callback){
	var qry = "INSERT INTO ezapatillas.marcas (nombre, Activo) VALUES ('"+ data.nombre + "', " + data.Activo +")";
	try{
		sql.execSqlQuery(qry,callback);	
	}catch(ex){
		console.log(ex);
	}
	
}
module.exports.insertMarca = insertMarca;

const updateMarca = async function(data,callback){
	sql.updateObject(data,'marcas',callback);
}
module.exports.updateMarca = updateMarca;


