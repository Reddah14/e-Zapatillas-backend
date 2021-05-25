
//import data connection
var conn=require('../config/connection');
//mysql module
var mysql = require('mysql'),



//create a new connection
connection = mysql.createConnection(
	conn
);
 var pathfile="./";
/**************************************************

	function  enum to array

***************************************************/
var enumToarray = function(rows) {
	var data=rows[0].request_type.split(",");
	var datareturn=[];
	for(var i=0;i<data.length;i++){
		datareturn.push(data[i].replace(/'/g,""));
	}
	return datareturn;
};
module.exports.enumToarray = enumToarray;
/**************************************************

	function return true if declared is a number else return false

***************************************************/
var isNumeric = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
};
module.exports.isNumeric = isNumeric;
/**************************************************

	function return if firts is true return sql+set else return sql+,

***************************************************/
var getStringUpdate=function(first,sql){
	if(first){
		sql+=' SET';
		first=false;
	}else{
		sql+=', ';
	}
	return sql;
}
module.exports.getStringUpdate = getStringUpdate;
/**************************************************

	function return true if declared is diferent than undefined else return false

***************************************************/
var isDefined=function(declared){
	return (typeof declared != 'undefined');
}
module.exports.isDefined = isDefined;
/**************************************************

	function return object globaldata updating sql to build update string also update first

***************************************************/
var updateMethod=function(column,data,isn,globaldata){
	var ok=true;
	if(isDefined(data)){
		if(isn && !isNumeric(data)){
			ok=false;
		}
		if(ok){
			globaldata.sql=getStringUpdate(globaldata.first,globaldata.sql);
			if(globaldata.first){
				globaldata.first=false;
			}
			if(isn){
				globaldata.sql+='  '+column+' = '+data;
			}else{
				globaldata.sql+='  '+column+' = '+connection.escape(data);
			}	
		}
			
	}
	return globaldata;
}

module.exports.updateMethod = updateMethod;
/**************************************************

	function return object globaldata updating  values/table to build insert string also update first

***************************************************/
var insertMethod=function(column,data,isn,globaldata){
	var ok=true;

	if(isDefined(data)){
		if(isn && !isNumeric(data)){
			ok=false;
		}
		if(ok){
			if(globaldata.first){
				globaldata.first=false;
			}else{
				globaldata.values+=',';
				globaldata.table+=',';
			}
			globaldata.table+=column;
			if(isn){
				globaldata.values+=data;
			}else{
				globaldata.values+=connection.escape(data);
			}
		}	
	}
	
	return globaldata;
}

module.exports.insertMethod = insertMethod;
/**************************************************

	function return object globaldata updating  sql to build select string also update first

***************************************************/
var selectMethod=function(column,data,isn,like,globaldata){
	var ok=true;
	if(isDefined(data)){
		if(isn && !isNumeric(data)){
			ok=false;
		}
		if(ok){
			if(globaldata.first){
				globaldata.sql+=" where ";
				globaldata.first=false;
			}else{
				globaldata.sql+=" and ";
			}
			if(isn){
				
				globaldata.sql+=column+"="+data;
			}else if(like){
				
				globaldata.sql+=column+" like '%"+data.replace(/'/g,"\'")+"%'";
			}else{
				
				globaldata.sql+=column+ "='"+data.replace(/'/g,"\'")+"'";
			}
		}
	}
	return globaldata;
}

module.exports.selectMethod = selectMethod;

/**************************************************

	function return color of line

***************************************************/
var getColor=function(idcolor,border,align){
	var result='<p style="';
	if(border==1){
		result+='border:1px solid red;';
	}
	if(align==1){
		result+='text-align: center;';
	}	
	switch(idcolor) {
	//blue
    case 1:
        return result+='color:blue;">';
        break;
	//red
    case 2:
        return  result+='color:red;">';
        break;
    default:
	//black
        return  result+='color:black;">';
	}
}
module.exports.getColor = getColor;
/**************************************************

	function return templeate warehouse in html

***************************************************/
var buildTemplateWarehouse=function(data,table,dataMail){
	
	var mountHtml='';

	var rt='<br>';
	var cp='</p>';
	var ul='<ul>';
	var cul='</ul>';
	var li='<li>';
	var cli='</li>';
	
	var nowlist=false;
	for(var i=0;i<data.length;i++){
		var line=data[i].line;
		var color=data[i].color;
		var list=data[i].showinlist;
		var border=data[i].border;
		var align=data[i].align;				
		// if no data list and before list close list
		if(nowlist && list==0){
			mountHtml+=cul;
			nowlist=false;
			//if after list create list
			}else if(list==1 && nowlist==false){
				nowlist=true;
				mountHtml+=ul+li;
			//add list
			}else if(list==1){
				mountHtml+=li;
			}
			//get p style (color, border, align)
			mountHtml+=getColor(color,border,align);
			//add data and close p
			if(line=='Turno:' ||line=='Passer:' ||line=='Turn:' ||line=='Shift:'){
				mountHtml+=line+' '+dataMail.turn+cp;
			}else if(line=='Fecha:' ||line=='Date:' ||line=='Data:'){
				mountHtml+=line+' '+dataMail.date+cp;
			}else if(line=='table'){
				mountHtml+=table+cp;
			}else{
				mountHtml+=line+cp;
			}
			
			//close li and add br
			if(list==1){
				mountHtml+=cli+rt;
			}
			//close list if is last date and is list
			if(i==data.length-1 && list==1){
				mountHtml+=cul;
			}

		}
		//console.log(mountHtml);
		return mountHtml;		
}
module.exports.buildTemplateWarehouse = buildTemplateWarehouse;
/**************************************************

	function return template to notice providers

***************************************************/
var buildTemplate=function(data){
	var mountHtml='';

	var rt='<br>';
	var cp='</p>';
	var ul='<ul>';
	var cul='</ul>';
	var li='<li>';
	var cli='</li>';
	
	var nowlist=false;
	for(var i=0;i<data.length;i++){
		var line=data[i].line;
		var color=data[i].color;
		var list=data[i].showinlist;
		var border=data[i].border;
		var align=data[i].align;				
		// if no data list and before list close list
		if(nowlist && list==0){
			mountHtml+=cul;
			nowlist=false;
			//if after list create list
			}else if(list==1 && nowlist==false){
				nowlist=true;
				mountHtml+=ul+li;
			//add list
			}else if(list==1){
				mountHtml+=li;
			}
			//get p style (color, border, align)
			mountHtml+=getColor(color,border,align);
			//add data and close p
			mountHtml+=line+cp;
			//close li and add br
			if(list==1){
				mountHtml+=cli+rt;
			}
			//close list if is last date and is list
			if(i==data.length-1 && list==1){
				mountHtml+=cul;
			}

		}
		//console.log(mountHtml);
		return mountHtml;		
}
//export functions
module.exports.buildTemplate = buildTemplate;


var removeDuplicates=function(arr){  
	var arr_output=[];
	for(var i=0;i<arr.length;i++){
		if(!objectInArrayObject(arr_output,arr[i])){
			arr_output.push(arr[i]);
		}
	 }
	 return arr_output;
 }
module.exports.removeDuplicates = removeDuplicates;

var objectInArrayObject=function(arr,obj){
	for(var i=0;i<arr.length;i++){
		if(isSameObject(obj,arr[i])){
           return true;
        }
    }
    return false;
}
module.exports.objectInArrayObject = objectInArrayObject;
var isSameObject=function(a, b){
      // Create arrays of property names
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length != bProps.length) {
        return false;
      }

      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      // If we made it this far, objects
      // are considered equivalent
      return true;
}
module.exports.isSameObject = isSameObject;













