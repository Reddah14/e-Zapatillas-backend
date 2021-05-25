const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const MarcasController = require('./../controllers/MarcasController');
const TallaController = require('./../controllers/TallaController');
const ColoresController = require('./../controllers/ColoresController');
const CategoriasController = require('./../controllers/CategoriasController');
const UserWebController 	= require('./../controllers/UserWebController');
const RolUserController = require('./../controllers/RolUserController');
const ArticulosController = require('./../controllers/ArticuloController');

const test= require('./../controllers/test');

const custom 	        = require('./../middleware/custom');
const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"e-Zapatillas API", data:{"version_number":"v1.0.1"}})
});


/* Articulos */
router.post(  '/insertArticulo',	passport.authenticate('jwt', {session:false}), ArticulosController.insertArticulo);   
router.get(  '/getArticulos',	passport.authenticate('jwt', {session:false}), ArticulosController.getArticulos);   
router.post(  '/updateArticulo',	passport.authenticate('jwt', {session:false}),  ArticulosController.updateArticulo);

/* Tallas */
router.post(  '/insertTalla',	passport.authenticate('jwt', {session:false}), TallaController.insertTalla);   
router.get(  '/getTallas',	passport.authenticate('jwt', {session:false}), TallaController.getTallas);   
router.post(  '/updateTalla',	passport.authenticate('jwt', {session:false}),  TallaController.updateTalla);

/* Colores */
router.post(  '/insertColor',	passport.authenticate('jwt', {session:false}), ColoresController.insertColor);   
router.get(  '/getColores',	passport.authenticate('jwt', {session:false}), ColoresController.getColores);   
router.post(  '/updateColor',	passport.authenticate('jwt', {session:false}),  ColoresController.updateColor);

/* Marcas */
router.post(  '/insertMarca',	passport.authenticate('jwt', {session:false}), MarcasController.insertMarca);   
router.get(  '/getMarcas',	passport.authenticate('jwt', {session:false}), MarcasController.getMarcas);   
router.post(  '/updateMarca',	passport.authenticate('jwt', {session:false}),  MarcasController.updateMarca);

/* Categorias */
router.post(  '/insertcategoria',	passport.authenticate('jwt', {session:false}), CategoriasController.insertcategoria);   
router.get(  '/getcategorias',	passport.authenticate('jwt', {session:false}), CategoriasController.getcategorias);   
router.post(  '/updatecategoria',	passport.authenticate('jwt', {session:false}), CategoriasController.updatecategoria);

/*users*/
router.get(  '/getUsers',	passport.authenticate('jwt', {session:false}),UserWebController.getUsers); 
router.post(  '/addUser', UserWebController.addUser);
router.get(  '/updateUser',	passport.authenticate('jwt', {session:false}),UserWebController.updateUser); 

/*rol_user*/
router.get(  '/getRolUser',	passport.authenticate('jwt', {session:false}),RolUserController.getRolUser);

router.post(  '/users/login', UserController.login);

//router.get(  '/test',								test.test3);

module.exports = router;

