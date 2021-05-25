//import functions
var functions=require('../functions/functions');
const bcrypt 			= require('bcryptjs');
//import data connection
var sql=require('../config/sql');
var constant=require('../config/constEnv');
var mysql = require('mysql');

const get = async function(userData,callback){
  
		var ezapatillas='ezapatillas';
		let qry="SELECT	u.id,u.rol_id,u.name,u.surname,	u.phone,u.email,"+
		"ifnull(u.staffing_provider_id,6000006) AS staffing_provider_id,"+
		"u.photo_profile,u.job_profile,	r.rol,"+
		"IFNULL(p.Alias, 'ezapatillas') AS staffing_provider,u.ezapatillas_country_id,"+
		"nc.country AS ezapatillas_country"+
		" FROM Users u"+
		" INNER JOIN rol_user r ON r.id = u.rol_id"+
		" LEFT JOIN staffing_provider p ON p.id = u.staffing_provider_id"+
		" LEFT JOIN ezapatillas_country nc ON nc.id = u.ezapatillas_country_id";

		if(functions.isDefined(userData.id)&&functions.isNumeric(userData.id)){
			qry+=' where u.id='+userData.id;
		}
		sql.execSqlQuery(qry,callback);
}
module.exports.get = get;

const update = async function(userData,callback){
	sql.updateObject(userData,'Users',callback);
}
module.exports.update = update;

const insert = async function(userData,callback){
	sql.insertObject(userData,'Users',callback);
	
}
module.exports.insert = insert;



