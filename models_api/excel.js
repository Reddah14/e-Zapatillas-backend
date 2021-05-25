//import functions
var functions=require('../functions/functions');
//import data connection
var sql=require('../config/sql');
//mail
var email=require('../functions/ses_sendmail');
//mailing
var mailing = require('../models_api/mailing');

//excel
var Excel = require('exceljs');
//import functions
//mysql module

 var pathfile="./";

const getExcelMain = async function(dataExcel,callback){
		var qry='select * from  view_stocktaking where stocktaking_id='+dataExcel.stocktaking_id;
		if(functions.isDefined(dataExcel.staffing_provider_id)){
			qry='select * from  stocktaking_staffing_provider where staffing_provider_id='+dataExcel.staffing_provider_id;
		}
		sql.execSqlQuery(qry,callback);
}
module.exports.getExcelMain = getExcelMain;

const getExcelEmployee = async function(dataExcel,callback){
		var qry="SELECT	e.id  AS  employee_id, e.alias  AS  alias, e .name  AS  name, e .surname  AS  surname, e .birthday  AS  birthday,"+
		" e.uid AS uid, e.email  AS  email, REPLACE(e.phone,' ','') AS  phone, p.alias  AS  staffing_provider, p.id  AS  staffing_provider_id,"+
		" ie . id  AS  mission_request_id, ie.is_contract_management  AS  is_contract_management, ie.contract_status  AS  contract_status,"+
		" ie . contract_request_id  AS  contract_request_id,	ip.arrival_time, ip.work_hours,IF (( ie .reservist  = '0'),	FALSE, TRUE) AS  reservist ,"+
		" ip . stocktaking_id  AS  stocktaking_id , w.nombre  AS  workfunction,  w.id  AS  workfunction_id, ie.staff_request_id  AS  staff_request_id, ie.confirmed  AS  confirmed "+
		" FROM mission_request ie INNER	JOIN employees  e  ON  ie.employee_id = e.id "+
		" INNER JOIN staff_request ip  ON ip.id  =  ie.staff_request_id "+
		" INNER JOIN staffing_provider  p  ON  p.id  =  ip.staffing_provider_id "+
		" INNER JOIN empfunciones w  ON  w.ID  =  ie.workfunction_id "+
		" where confirmed=1 and stocktaking_id="+dataExcel.stocktaking_id;
	
		if(functions.isDefined(dataExcel.staffing_provider_id)){
			qry+=' and staffing_provider_id='+dataExcel.staffing_provider_id;
		}
		qry+=' order by staffing_provider,arrival_time,surname';
		sql.execSqlQuery(qry,callback);
}
module.exports.getExcelEmployee = getExcelEmployee;

const generateExcel = async function(dataExcel,callback){
   getExcelMain(dataExcel,function(error, dataMain)
	{
		if(dataMain.length>0){
			getExcelEmployee(dataExcel,function(error, dataEmployee)
			{
				var emp=[];
				var countemp=0;
				var countri=0;
				var table='<table border=1 style="width:100%; ">'+
				'<tr>'+
				'<th style="text-align: left;">Firstname</th>'+
				'<th style="text-align: left;">Lastname</th>'+
				'<th style="text-align: left;">Uid</th>'+
				'<th style="text-align: left;">Workfunction</th>'+
				'<th style="text-align: left;">Phone</th>'+
				'<th style="text-align: left;">StaffingProvider</th>'+
				'</tr>';
				for(var i=0;i<dataEmployee.length;i++){
					if(dataEmployee[i].workfunction_id==1){
						emp[countemp]=dataEmployee[i];
						countemp++;
					}else{
						table+='<tr>'+
						'<td>'+dataEmployee[i].name+'</td>'+
						'<td>'+dataEmployee[i].surname+'</td>'+
						'<td>'+dataEmployee[i].uid+'</td>'+
						'<td>'+dataEmployee[i].workfunction+'</td>'+
						'<td>'+dataEmployee[i].phone+'</td>'+
						'<td>'+dataEmployee[i].staffing_provider+'</td>'+
						'</tr>';
						countri++;
					}
				}
				saveDocument(dataMain,emp,functions.isDefined(dataExcel.staff_request_id),function(error, file)
				{
					if(functions.isDefined(dataExcel.sendmail)){
						var ht='<h4>Stocktaking: '+dataMain[0].warehouse_name+' </h4>';
						ht+='<p>Date:'+dataMain[0].date+'</p>';
						ht+='<p>People has find:'+dataMain[0].number_employees+'</p><br>';
						if(countri>0){ht+=table;}
						var body=ht;
						var subject=dataMain[0].warehouse_name+' - date :'+dataMain[0].date;
						var filenamepath= pathfile+file.file;
						var to=dataExcel.sendmail;
						email.sendEmailAttachment(body,subject,to,filenamepath,function(error,data){
							if(error){
								callback(error,{"message":"Error"});
							}else{
								const fs = require('fs');

								fs.unlink(pathfile+file.file, (err) => {
								  if (err){
									console.log(err);
								  }else{
								  // console.log('successfully deleted '+pathfile+file.file);
								   callback(null,{"message":"Ok"});
								  }
								});
							}
						});			
					}else{
						callback(null, file);
					}
					
				});
			});
		}else{
			callback(null,{"message":"Error"});
		}
		
	});
}
module.exports.generateExcel = generateExcel;



const generateExcelToDownload = async function(dataExcel,callback){
   getExcelMain(dataExcel,function(error, dataMain)
	{
		if(dataMain.length>0){
			getExcelEmployee(dataExcel,function(error, dataEmployee)
			{
				var emp=[];
				var countemp=0;
				for(var i=0;i<dataEmployee.length;i++){
					if(dataEmployee[i].workfunction_id==1){
						emp[countemp]=dataEmployee[i];
						countemp++;
					}
				}
				saveDocument(dataMain,emp,functions.isDefined(dataExcel.staff_request_id),function(error, file)
				{
					callback(null, file);		
				});
			});
		}else{
			callback(null,{"message":"Error"});
		}
		
	});
}
module.exports.generateExcelToDownload = generateExcelToDownload;


const saveDocument = async function(dataMain,dataEmployee,provider,callback){
   var whitestyle = {  color: { argb: 'ffffff' } };
	var redstyle = {  color: { argb: 'c01b2c' } };
	var center= { vertical: 'middle', horizontal: 'center' };
	var border= {
		top: {style:'thin'},
		left: {style:'thin'},
		bottom: {style:'thin'},
		right: {style:'thin'}
	};
	var redback={
		type: 'pattern',
		pattern:'solid',
		fgColor:{argb:'c01b2c'},
		bgColor:{argb:'c01b2c'}
	};
	var greyback={
		type: 'pattern',
		pattern:'solid',
		fgColor:{argb:'d9d9d9'},
		bgColor:{argb:'d9d9d9'}
	};
	// create workbook & add worksheet
	var workbook = new Excel.Workbook();
	//name of sheet
	var worksheet = workbook.addWorksheet('List');
	//width of columns
	worksheet.columns = [
		{  width: 22 },
		{  width: 22 },
		{  width: 21 },
		{  width: 29 },
		{  width: 23 },
		{  width: 29 },
		{  width: 28 },
		{  width: 28 },
	];
	//logo
	worksheet.mergeCells('A1:H1');
	var imageId1 = workbook.addImage({
	  filename: './assets/logo.jpg',
	  extension: 'jpg',
	});
	worksheet.addImage(imageId1, 'D1:F1');
	//heigth rows
	worksheet.getRow(1).height = 90;
	worksheet.getRow(2).height = 76;
	worksheet.getRow(6).height = 78;
	//message row
	worksheet.mergeCells('A2:H2');
	worksheet.getCell('A2').value="LISTE A COMMUNIQUER J-1 DE LA MISSION AVANT 12H00";
	worksheet.getCell('A2').fill=greyback;
	worksheet.getCell('A2').alignment =center;
	worksheet.getCell('A2').font=redstyle;
	worksheet.getCell('A2').border=border;
	//data stocktatking
	worksheet.getCell('A3').value="AGENCE :";
	worksheet.getCell('A3').border=border;
	worksheet.getCell('A3').alignment=center;
	//agence data if provider is true
	if(provider && dataEmployee.length>0 ){
		worksheet.getCell('B3').value=dataEmployee[0].staffing_provider;
	}

	worksheet.mergeCells('B3:H3');
	worksheet.getCell('B3').alignment=center;
	worksheet.getCell('B3').border=border;
	worksheet.getCell('A4').value="LIEU :";
	worksheet.getCell('A4').border=border;
	worksheet.getCell('A4').alignment=center;
	worksheet.mergeCells('B4:H4');
	//data client
	worksheet.getCell('B4').value=dataMain[0].warehouse_name;
	worksheet.getCell('B4').alignment=center;
	worksheet.getCell('B4').border=border;
	worksheet.getCell('A5').value="DATE :";
	worksheet.getCell('A5').border=border;
	worksheet.getCell('A5').alignment=center;
	worksheet.mergeCells('B5:H5');
	//data DATE
	worksheet.getCell('B5').value=dataMain[0].date;
	worksheet.getCell('B5').alignment=center;
	worksheet.getCell('B5').border=border;
	worksheet.getCell('A6').value="HEURE DEMARRAGE INVENTAIRE :";
	worksheet.getCell('A6').border=border;
	worksheet.getCell('A6').alignment=center;
	worksheet.getCell('B6').value="LES INVENTORISTES DOIVENT SE PRESENTER SUR LE LIEU DE MISSION AU MINIMUM 15 MINUTES AVANT LE DEMARRAGE DE LA MISSION";
	worksheet.getCell('B6').border=border;
	worksheet.getCell('B6').alignment=center;
	worksheet.mergeCells('B6:H6');
	worksheet.mergeCells('A7:H7');
	//columns employee Stocktaking
	worksheet.getCell('A8').value="OP";
	worksheet.getCell('A8').fill=greyback;
	worksheet.getCell('A8').border=border;
	worksheet.getCell('B8').value="NOM";
	worksheet.getCell('B8').fill=greyback;
	worksheet.getCell('B8').border=border;
	worksheet.getCell('C8').value="PRENOM";
	worksheet.getCell('C8').fill=greyback;
	worksheet.getCell('C8').border=border;
	worksheet.getCell('D8').value="AGENCE";
	worksheet.getCell('D8').fill=greyback;
	worksheet.getCell('D8').border=border;
	worksheet.getCell('E8').value="MATRICULE";
	worksheet.getCell('E8').fill=greyback;
	worksheet.getCell('E8').border=border;
	worksheet.getCell('F8').value="TELEPHONE";
	worksheet.getCell('F8').fill=greyback;
	worksheet.getCell('F8').border=border;
	worksheet.getCell('G8').value="MAIL";	
	worksheet.getCell('G8').fill=greyback;
	worksheet.getCell('G8').border=border;
	worksheet.getCell('H8').value="START HOUR";	
	worksheet.getCell('H8').fill=greyback;
	worksheet.getCell('H8').border=border;
	worksheet.mergeCells('A9:H9');

	worksheet.getCell('A9').font=whitestyle;
	worksheet.getCell('A9').value="INVENTORISTE(S)";
	worksheet.getCell('A9').fill=redback;
	worksheet.getCell('A9').alignment=center;
	worksheet.getCell('A9').border=border;
	worksheet.getCell('A10').name="INI";
	var row=10;
	var opNum=1;
	for(var i=0;i<dataEmployee.length;i++){
		if(dataEmployee[i].reservist==0){
			worksheet.getCell('A'+row).value=opNum;
			worksheet.getCell('B'+row).value=dataEmployee[i].surname;
			worksheet.getCell('C'+row).value=dataEmployee[i].name;
			worksheet.getCell('D'+row).value=dataEmployee[i].staffing_provider;
			worksheet.getCell('E'+row).value=dataEmployee[i].uid;
			
			if(functions.isDefined(dataEmployee[i].phone) && dataEmployee[i].phone!=null && dataEmployee[i].phone!=''){
				worksheet.getCell('F'+row).value=dataEmployee[i].phone;
			}else{
				worksheet.getCell('F'+row).value='+00 123456789';
			}
			if(functions.isDefined(dataEmployee[i].email) && dataEmployee[i].email!=null && dataEmployee[i].email!=''){
				worksheet.getCell('G'+row).value=dataEmployee[i].email;
			}else{
				worksheet.getCell('G'+row).value='nomail@nomail';
			}
			
			worksheet.getCell('H'+row).value=dataEmployee[i].arrival_time;
			row++;
			opNum++;
		}
	}
	row++;
	worksheet.mergeCells('A'+row+':H'+row);
	worksheet.getCell('A'+row).font=whitestyle;
	worksheet.getCell('A'+row).value="RESERVISTE(S)";
	worksheet.getCell('A'+row).fill=redback;
	worksheet.getCell('A'+row).alignment=center;
	worksheet.getCell('A'+row).border=border;
	row++;
	for(var i=0;i<dataEmployee.length;i++){
		if(dataEmployee[i].reservist!=0){
			worksheet.getCell('A'+row).value=opNum;
			worksheet.getCell('B'+row).value=dataEmployee[i].surname;
			worksheet.getCell('C'+row).value=dataEmployee[i].name;
			worksheet.getCell('D'+row).value=dataEmployee[i].staffing_provider;
			worksheet.getCell('E'+row).value=dataEmployee[i].uid;
			if(functions.isDefined(dataEmployee[i].phone) && dataEmployee[i].phone!=null && dataEmployee[i].phone!=''){
				worksheet.getCell('F'+row).value=dataEmployee[i].phone;
			}else{
				worksheet.getCell('F'+row).value='+00 123456789';
			}
			if(functions.isDefined(dataEmployee[i].email) && dataEmployee[i].email!=null && dataEmployee[i].email!=''){
				worksheet.getCell('G'+row).value=dataEmployee[i].email;
			}else{
				worksheet.getCell('G'+row).value='nomail@nomail';
			}
			worksheet.getCell('H'+row).value=dataEmployee[i].arrival_time;
			row++;
			opNum++;
		}
	}
	var filename=dataMain[0].cod+'_'+dataMain[0].client.replace(/ /g,"")+'_'+dataMain[0].warehouse_name.replace(/ /g,"")+'_'+dataMain[0].date+'_'+Date.now()+'.xlsx';
	workbook.xlsx.writeFile(filename).then(function() {
	  callback(null,{"file":filename});
	});
}
module.exports.saveDocument = saveDocument;


