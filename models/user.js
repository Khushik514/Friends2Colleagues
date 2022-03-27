var crypto = require('crypto');
 var mongoose = require('mongoose');

 var userSchema = new mongoose.Schema({
   email: {
     type: String,
     unique: true,
     required: true
   },
   name: {
     type: String,
     required: true
   },
   hash: String,
   salt: String
 });

 userSchema.methods.validatePass = function(password) {
     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
     return this.hash === hash;
   };

 userSchema.methods.setPass = function(password) {
   this.salt = crypto.randomBytes(16).toString('hex');
   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
 };

 module.exports = mongoose.model('User', userSchema);