//import express
var express = require('express');
const bcrypt = require('bcryptjs');
//model of sql
var userweb = require('../models_api/userweb');
var functions=require('../functions/functions');
const jwt = require('jsonwebtoken');

/*******************************************************

	http://localhost:8081/v1/getUsers
	return keys:
	id
	rol_id
	name
	surname
	phone
	email
	staffing_provider_id
	photo_profile
	job_profile
	rol
	staffing_provider
	request keys:
	id
	ezapatillas_country_id
********************************************************/
const getUsers = function(req, res){
	var dataUser = {
	    id : req.query.id,
	};
	
	userweb.get(dataUser,function(error, data)
    {
		if(error){
			return res.status(500).json({"message":"Error "});
		}else{
			return res.status(200).json(data);
		}
		
    });
}
module.exports.getUsers = getUsers
/*************************************************************

	http://localhost:8081/v1/addUser?id=63&name=raul&surname=domingo&phone=675&email=rdomingo@inno-it.es&staffing_provider_id=6000006&rol_id=1&photo_profile=test&job_profile=test&password=test
	request keys:
	name,
	surname,
	phone,
	email,
	user,
	password,
	staffing_provider_id,
	photo_profile,
	job_profile,
	rol_id
	ezapatillas_country_id
*************************************************************/

const addUser = function(req, res){
	var dataUser = req.body;
	if(!functions.isDefined(dataUser.name) ||
		!functions.isDefined( dataUser.surname)||
		!functions.isDefined( dataUser.password) ||
		!functions.isDefined( dataUser.email)){
			return res.status(500).json({"message":"Error please enter all camps"});
	}else{
		if(functions.isDefined(dataUser.password)){
			hashKey(dataUser.password,function(error, data){
				dataUser.password=data;
				userweb.insert(dataUser,function(error, data)
				{
					if(error){
						return res.status(500).json(data);
					}else{
						return res.status(200).json(data);
					}
				});
			});
		}
		
	}
}
module.exports.addUser = addUser

/********************************

	http://localhost:8081/v1/updateUser?id=63&name=raul&surname=domingo&phone=675&email=rdomingo@inno-it.es&staffing_provider_id=6000006&rol_id=1&photo_profile=test&job_profile=test

	request keys:
	id
	name
	surname
	phone
	email
	password
	staffing_provider_id
	photo_profile
	job_profile
	rol_id
	ezapatillas_country_id
********************************/

const updateUser = function(req, res){
	var dataUser = {
	  id : req.query.id,
	  name : req.query.name,
	  surname : req.query.surname,
	  phone : req.query.phone,
	  email : req.query.email,
	 // user  :req.query.user,
	  password : req.query.password,
	  staffing_provider_id : req.query.staffing_provider_id,
	  photo_profile : req.query.photo_profile,
	  job_profile : req.query.job_profile,
	  rol_id : req.query.rol_id,
	  ezapatillas_country_id : req.query.ezapatillas_country_id,
	};
	
	if(!functions.isDefined(dataUser.id)  && functions.isNumeric(dataUser.id)){

			return res.status(500).json({"message":"Error please enter all camps"});
	}else{
		if(functions.isDefined(dataUser.password)){
			hashKey(dataUser.password,function(error, data){
				dataUser.password=data;
				userweb.update(dataUser,function(error, data)
				{
					if(error){
						return res.status(500).json(data);
					}else{
						return res.status(200).json(data);
					}
				});
			});
		}else{
			userweb.update(dataUser,function(error, data)
			{
				if(error){
					return res.status(500).json(data);
				}else{
					return res.status(200).json(data);
				}
			});
		}
		
	}
}

module.exports.updateUser = updateUser

const hashKey=function(pwd,callback){
	
	
    bcrypt.genSalt(10,function(err,salt){
		if(err){
			callback(err,null);
		}else{
			bcrypt.hash(pwd, salt,function(err,newpwd){
				if(err){
					callback(err,null);
				}else{
					callback(null,newpwd);
				}
			});
		}
	});      
}
module.exports.hashKey =hashKey;






