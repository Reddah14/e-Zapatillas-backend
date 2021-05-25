
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A085E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D83FC9B689459D738F8C88A3A48AA9E33542016B7A4052E001AAA536FCA74813CB';




const encrypt = function(text) {
	var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
};
module.exports.encrypt = encrypt;

const decrypt  = function(text) {
	

var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;

};
module.exports.decrypt  = decrypt ;