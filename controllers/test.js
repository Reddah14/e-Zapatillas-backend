//import express
var express = require('express');


//import functions
var functions=require('../functions/functions');
var crypto=require('../functions/crypto');



const test = function(req, res){
console.log('test');

}
module.exports.test = test;

const test2 = function(req, res){
console.log('test - post');
	console.log(req.body)
}
module.exports.test2 = test2;


const test3 = function(req, res){
		try {
	var test=req.query.test;
	test=crypto.decrypt(test);

	
	d=JSON.parse(test);
	console.log(d.mission_request_id);
	

} catch (err) {
  // Handle the error here.
  console.log(err)
}

}
module.exports.test3 = test3;

