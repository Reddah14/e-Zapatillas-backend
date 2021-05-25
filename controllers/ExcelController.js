//import express
var express = require('express');

//model of sql
var model = require('../models_api/excel');
//import functions
var functions=require('../functions/functions');

const getExcelMain = function(request, res){
	var dataExcel = {
		  stocktaking_id : request.query.stocktaking_id,
		  staffing_provider_id : request.query.staffing_provider_id,
		};
		model.getExcelMain(dataExcel,function(error, data)
		{
			if(error){
				return res.status(500).json(error);
			}else{
				return res.status(200).json(data);
			}
		});
}
module.exports.getExcelMain = getExcelMain;

const getExcelEmployee = function(request, res){
	var dataExcel = {
		  stocktaking_id : request.query.stocktaking_id,
		  staffing_provider_id : request.query.staffing_provider_id,
		};
		model.getExcelEmployee(dataExcel,function(error, data)
		{
			if(error){
				return res.status(500).json(error);
			}else{
				return res.status(200).json(data);
			}
		});
}
module.exports.getExcelEmployee = getExcelEmployee;



const generateExcel = function(request, res){
		var dataExcel = {
		  stocktaking_id : request.query.stocktaking_id,
		  staff_request_id : request.query.staff_request_id,
		  sendmail : request.query.sendmail,
		};

		model.generateExcel(dataExcel,function(error, data)
		{
			if(error){
				return res.status(500).json(error);
			}else{
				return res.status(200).json(data);
			}
		});
}
module.exports.generateExcel = generateExcel;

/*http://localhost:8081/v1/generateExcelToDownload?stocktaking_id=1*/
const generateExcelToDownload=function(request,res){
	var dataExcel = {
		stocktaking_id : request.query.stocktaking_id,
		staff_request_id : request.query.staff_request_id,
	};
	model.generateExcelToDownload(dataExcel,function(error, data)
	{
		if(error){
			return res.status(500).json(error);
		}else{
			return res.status(200).json(data);
		}
	});
}
module.exports.generateExcelToDownload = generateExcelToDownload;

/* http://localhost:8081/v1/downloadStocktakingExcel?file=CDCBERLINKADEWE1527667340656.xlsx */
const downloadExcel=function(request,res){

	var reqFile = request.query.file;
	console.log(reqFile);
	if(functions.isDefined(reqFile) && reqFile.indexOf('.xlsx') > -1){
		var path = require('path');
		var mime = require('mime');
		var fs = require('fs');
		var file = './'+reqFile;
		var filename = path.basename(file);
		var mimetype = mime.lookup(file);
		res.setHeader('Content-disposition', 'attachment; filename=' + filename);
		res.setHeader('Content-type', mimetype);
		var filestream = fs.createReadStream(file);
		filestream.pipe(res);
			fs.unlink(filename, (err) => {
			});
	}else{
		return res.status(500).json("Error on file");
	}
}	
module.exports.downloadExcel = downloadExcel

/* http://localhost:8081/v1/deleteExcel?file=CDCBERLINKADEWE1527667340656.xlsx */
const deleteExcel=function(request,res){
	var reqFile = request.query.file;
	if(functions.isDefined(reqFile) && reqFile.indexOf('.xlsx') > -1){
		var path = require('path');
		var file = './'+reqFile;
		var filename = path.basename(file);
		const fs = require('fs');
		fs.unlink(filename, (err) => {
			if (err){
				console.log(err);
				return res.status(500).json("Error on delete");
			}else{
				return res.status(200).json("Ok");
			}
		});
	}else{
		return res.status(500).json("Error on file");
	}
}	
module.exports.deleteExcel = deleteExcel;