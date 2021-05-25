//import express
var express = require('express');

//model of sql
var categorias = require('../models_api/categorias');
//import functions
var functions=require('../functions/functions');

/**********************************************

	http://localhost:8081/v1/getcategorias
	return keys:
	nombre (text)
	id (int)
	descripcion (text)
	activo (bool)

	request keys:


**********************************************/

const getcategorias = function(req, res){
	var obj={
	};	
	categorias.get(obj,function(error, data)
    {
			if(error){
				return res.status(500).json(data);
			}else{
				return res.status(200).json(data);
			}
    });
}
module.exports.getcategorias = getcategorias;

/***************************************************

	http://localhost:8081/v1/insertcategoria?nombre=test

	request keys:
	nombre 

	

***************************************************/
const insertcategoria = function(request, res){

	var dataSearcher={
		nombre : request.body.nombre,
		descripcion : request.body.descripcion,
		Activo : request.body.Activo
	};	
	
	categorias.insertcategoria(dataSearcher,function(error, data)
    {
		if(error){
			return res.status(500).json(data);
		}else{
			return res.status(200).json(data);
		}
		
    });
}
module.exports.insertcategoria = insertcategoria;

/***************************************************

	http://localhost:8081/v1/updatecategoria?nombre=test

	request keys:
	nombre 
	id(required)

***************************************************/
const updatecategoria = function(request, res){

	var dataSearcher={
		id:request.body.id,
		nombre : request.body.nombre,
		descripcion : request.body.descripcion,
		Activo : request.body.Activo
	};	
	if(functions.isDefined(dataSearcher.id) && functions.isNumeric(dataSearcher.id)){
		categorias.updatecategoria(dataSearcher,function(error, data)
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
module.exports.updatecategoria = updatecategoria;
