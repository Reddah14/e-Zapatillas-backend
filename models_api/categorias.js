
//import data connection
var sql=require('../config/sql');

//import functions
var functions=require('../functions/functions');
var dateFormat = require('dateformat');

const get = async function(obj,callback){
	
	var qry="SELECT * FROM	categorias ";
	
	sql.execSqlQuery(qry,callback);
}

module.exports.get = get;

const insertcategoria = async function(data,callback){
	var qry = "INSERT INTO ezapatillas.categorias (nombre, descripcion, Activo) VALUES ('"+ data.nombre + "','" + data.descripcion + "'," + data.Activo + ")";
	try{
		sql.execSqlQuery(qry,callback);	
	}catch(ex){
		console.log(ex);
	}
	
}
module.exports.insertcategoria = insertcategoria;

const updatecategoria = async function(data,callback){
	sql.updateObject(data,'categorias',callback);
}
module.exports.updatecategoria = updatecategoria;


