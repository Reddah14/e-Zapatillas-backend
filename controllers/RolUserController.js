//import express
var express = require('express');

//model of sql
var roluser = require('../models_api/roluser');

/****************************************************

	http://localhost:8081/v1/getRolUser
	
	return keys:
	id
	rol

****************************************************/

const getRolUser = function(req, res){
	
	roluser.get(function(error, data)
    {
		if(error){
			return res.status(500).json(data);
		}else{
			return res.status(200).json(data);
		}
    });
}
module.exports.getRolUser = getRolUser





