
//import data connection
var sql=require('../config/sql');


const get = async function(callback){
   
		var qry="select * from rol_user";
		sql.execSqlQuery(qry,callback);
}
module.exports.get = get;
