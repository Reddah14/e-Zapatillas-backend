//import express
var express = require('express');

//model of sql
var Tallas = require('../models_api/Talla');
//import functions
var functions=require('../functions/functions');

/**********************************************

	http://localhost:8081/v1/getTallas
	return keys:
	nombre
	id

	request keys:


**********************************************/

const getTallas = function(req, res){
	var obj={
	};	
	Tallas.get(obj,function(error, data)
    {
			if(error){
				return res.status(500).json(data);
			}else{
				return res.status(200).json(data);
			}
    });
}
module.exports.getTallas = getTallas;

/***************************************************

	http://localhost:8081/v1/insertTalla?nombre=test

	request keys:
	nombre
	descripcion
	Activo

	

***************************************************/
const insertTalla = function(request, res){

	var dataSearcher={
		nombre : request.body.nombre,
		Activo : request.body.Activo
	};	
	
	Tallas.insertTalla(dataSearcher,function(error, data)
    {
		if(error){
			return res.status(500).json(data);
		}else{
			return res.status(200).json(data);
		}
		
    });
}
module.exports.insertTalla = insertTalla;

/***************************************************

	http://localhost:8081/v1/updateTalla?nombre=test

	request keys:
	nombre 
    Activo
    descripcion
	id(required)

***************************************************/
const updateTalla = function(request, res){

	var dataSearcher={
		id:request.body.id,
        nombre : request.body.nombre,
        descripcion : request.body.descripcion,
		Activo : request.body.Activo
	};	
	if(functions.isDefined(dataSearcher.id) && functions.isNumeric(dataSearcher.id)){
		Tallas.updateTalla(dataSearcher,function(error, data)
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
module.exports.updateTalla = updateTalla;
