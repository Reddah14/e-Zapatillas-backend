/**********************
		LOCALHOST CONSTS
***********************/

module.exports = Object.freeze({
	 PORTAMAZON : '8081',
	 IPCONNECT  : 'https://oh-api-main.eu-west-3.elasticbeanstalk.com',// unused
     APP       : 'dev',
	 PORTAPP   :  '3000',//no change
	 DIALECT   :  'mysql',//BD
	 HOST      :  'localhost',//BD
	 PORT      :  '3306',//BD
	 NAME      :  'ezapatillas',//BD
	 USER      :  'root',//BD
	 PASSWORD  :  'RaSm269269!',//BD
	 ENCRYPTATION  :  'Novastock1112238458',//ENCRYP
	 EXPIRATION    :  '864000',//token duration(seg 10 days)
});

/**********************
		AWS CONSTS
***********************/

/*************************************
	aws prod
**************************************/
/*
module.exports = Object.freeze({
	 PORTAMAZON : '8081',
	 IPCONNECT : 'https://oh-api-main.eu-west-3.elasticbeanstalk.com',// unused
     APP       : 'dev',
	 PORTAPP   :  '3000',//no change
	 DIALECT   :  'mysql',//BD
	 HOST      :   'aa1m1yxm0ttdskp.ckmhmmloegou.eu-west-3.rds.amazonaws.com',//BD
	 PORT      :  '3306',//BD
	 NAME      :  'ebdb',//BD
	 USER      :  'oh',//BD
	 PASSWORD  :  'oh12345678',//BD
	 ENCRYPTATION  :  'Novastock1112238458',//ENCRYP
	 EXPIRATION    : '864000',//token duration(seg 10 days)
});
/*************************************
	aws dev
**************************************/
/*
module.exports = Object.freeze({
	 PORTAMAZON : '8081',
	 IPCONNECT : 'https://oh-api-main.eu-west-3.elasticbeanstalk.com',// unused
     APP       : 'dev',
	 PORTAPP   :  '3000',//no change
	 DIALECT   :  'mysql',//BD
	 HOST      : 'aa1v0xh8j299lfq.ckmhmmloegou.eu-west-3.rds.amazonaws.com',//BD
	 PORT      :  '3306',//BD
	 NAME      :  'ebdb',//BD
	  USER      :  'oh',//BD
	 PASSWORD  :  'oh12345678',//BD
	 ENCRYPTATION  :  'Novastock1112238458',//ENCRYP
	 EXPIRATION    :  '864000',//token duration(seg 10 days)
});
*/