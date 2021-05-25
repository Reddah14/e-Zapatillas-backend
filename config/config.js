const constant=require('./constEnv');


require('dotenv').config();//instatiate environment variables

CONFIG = {} //Make this global to use all over the application

CONFIG.app          = constant.APP;
CONFIG.port         = constant.PORTAPP ;

CONFIG.db_dialect   = constant.DIALECT;
CONFIG.db_host      = constant.HOST;
CONFIG.db_port      = constant.PORT;
CONFIG.db_name      = constant.NAME;
CONFIG.db_user      = constant.USER;
CONFIG.db_password  = constant.PASSWORD;

CONFIG.jwt_encryption  = constant.ENCRYPTATION;
CONFIG.jwt_expiration  = constant.EXPIRATION;


