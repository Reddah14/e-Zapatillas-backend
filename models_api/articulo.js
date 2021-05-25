
//import data connection
var sql=require('../config/sql');

//import functions
var functions=require('../functions/functions');
var dateFormat = require('dateformat');

const get = async function(obj,callback){
	
	var qry="SELECT * FROM	getzapatillascustomer ";
	
	sql.execSqlQuery(qry,callback);
}

module.exports.get = get;
// MAX IMAGE SIZE: 56kb
const insertArticulo = async function(data,callback){
	var qry = "INSERT INTO ezapatillas.articulo (nombre, descripcion, idCategoria, precio, idMarca, idColor, Imagen, Activo) VALUES ('"+ data.nombre + "','" + data.descripcion + "','" + data.idCategoria + "','" + data.precio + "','" + data.idMarca + "','" + data.idColor + "','" + data.imagen + "'," + data.Activo + ")";
	try{
		sql.execSqlQuery(qry,callback);	
	}catch(ex){
		console.log(ex);
	}
	
}
module.exports.insertArticulo = insertArticulo;

const updateArticulo = async function(data,callback){
	sql.updateObject(data,'articulo',callback);
}
module.exports.updateArticulo = updateArticulo;


