//import express
var express = require('express');

//model of sql
var articulo = require('../models_api/articulo');
//import functions
var functions=require('../functions/functions');

/**********************************************

	http://localhost:8081/v1/getarticulos
	return keys:
	nombre (text)
	id (int)
	descripcion (text)
	activo (bool)

	request keys:


**********************************************/

const getArticulos = function(req, res){
	var obj={
	};	
	articulo.get(obj,function(error, data)
    {
			if(error){
				return res.status(500).json(data);
			}else{
				return res.status(200).json(data);
			}
    });
}
module.exports.getArticulos = getArticulos;

/***************************************************

	http://localhost:8081/v1/insertcategoria?nombre=test

	request keys:
	nombre 

	

***************************************************/
const insertArticulo = function(request, res){

	var dataSearcher={
		nombre : request.body.nombre,
		descripcion : request.body.descripcion,
		idCategoria : request.body.idCategoria,
		precio : request.body.precio,
		idMarca : request.body.idMarca,
		idColor : request.body.idColor,
		imagen : request.body.imagen,
		Activo : request.body.Activo,
		esMujer: request.body.esMujer
	};	
	
	articulo.insertArticulo(dataSearcher,function(error, data)
    {
		if(error){
			return res.status(500).json(data);
		}else{
			return res.status(200).json(data);
		}
		
    });
}
module.exports.insertArticulo = insertArticulo;

/***************************************************

	http://localhost:8081/v1/updateArticulo?nombre=test

	request keys:
	nombre 
	id(required)

***************************************************/
const updateArticulo = function(request, res){

	var dataSearcher={
        id : request.body.id,
		nombre : request.body.nombre,
		descripcion : request.body.descripcion,
		idCategoria : request.body.idCategoria,
		precio : request.body.precio,
		idMarca : request.body.idMarca,
		idColor : request.body.idColor,
		imagen : request.body.imagen,
		Activo : request.body.Activo,
		esMujer: request.body.esMujer
	};
	if(functions.isDefined(dataSearcher.id) && functions.isNumeric(dataSearcher.id)){
		articulo.updateArticulo(dataSearcher,function(error, data)
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
module.exports.updateArticulo = updateArticulo;
