//import express
var express = require('express');

//model of sql
var marcas = require('../models_api/marcas');
//import functions
var functions=require('../functions/functions');

/**********************************************

	http://localhost:8081/v1/getmarcas
	return keys:
	nombre
	id

	request keys:


**********************************************/

const getMarcas = function(req, res){
	var obj={
	};	
	marcas.get(obj,function(error, data)
    {
			if(error){
				return res.status(500).json(data);
			}else{
				return res.status(200).json(data);
			}
    });
}
module.exports.getMarcas = getMarcas;

/***************************************************

	http://localhost:8081/v1/insertmarca?nombre=test

	request keys:
	nombre
	Activo

	

***************************************************/
const insertMarca = function(request, res){

	var dataSearcher={
		nombre : request.body.nombre,
		Activo : request.body.Activo
	};	
	
	marcas.insertMarca(dataSearcher,function(error, data)
    {
		if(error){
			return res.status(500).json(data);
		}else{
			return res.status(200).json(data);
		}
		
    });
}
module.exports.insertMarca = insertMarca;

/***************************************************

	http://localhost:8081/v1/updatemarca?nombre=test

	request keys:
	nombre 
	Activo
	id(required)

***************************************************/
const updateMarca = function(request, res){

	//var group=company.substring(0, 3)+' '+request.query.country;
	var dataSearcher={
		id:request.body.id,
		nombre : request.body.nombre,
		Activo : request.body.Activo
	};	
	if(functions.isDefined(dataSearcher.id) && functions.isNumeric(dataSearcher.id)){
		marcas.updateMarca(dataSearcher,function(error, data)
		{
			if(error){
				return res.status(500).json(data);
			}else{
				return res.status(200).json(data);
			}
		
		});
	}else{
		return res.status(500).json("Error please send id");
	}
	
}
module.exports.updateMarca = updateMarca;
