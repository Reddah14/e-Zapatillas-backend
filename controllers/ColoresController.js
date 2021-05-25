//import express
var express = require('express');

//model of sql
var colores = require('../models_api/colores');
//import functions
var functions=require('../functions/functions');

/**********************************************

	http://localhost:8081/v1/getcolores
	return keys:
	nombre
	id

	request keys:


**********************************************/

const getColores = function(req, res){
	var obj={
	};	
	colores.get(obj,function(error, data)
    {
			if(error){
				return res.status(500).json(data);
			}else{
				return res.status(200).json(data);
			}
    });
}
module.exports.getColores = getColores;

/***************************************************

	http://localhost:8081/v1/insertColor?nombre=test

	request keys:
    nombre
    hex
	Activo

	

***************************************************/
const insertColor = function(request, res){

	var dataSearcher={
        nombre : request.body.nombre,
        hex :    request.body.hex,
		Activo : request.body.Activo
	};	
	
	colores.insertColor(dataSearcher,function(error, data)
    {
		if(error){
			return res.status(500).json(data);
		}else{
			return res.status(200).json(data);
		}
		
    });
}
module.exports.insertColor = insertColor;

/***************************************************

	http://localhost:8081/v1/updatemarca?nombre=test

	request keys:
	nombre 
	Activo
	id(required)

***************************************************/
const updateColor = function(request, res){
	var dataSearcher={
		id:request.body.id,
        nombre : request.body.nombre,
        hex: request.body.hex,
		Activo : request.body.Activo
	};	
	if(functions.isDefined(dataSearcher.id) && functions.isNumeric(dataSearcher.id)){
		colores.updateColor(dataSearcher,function(error, data)
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
module.exports.updateColor = updateColor;
