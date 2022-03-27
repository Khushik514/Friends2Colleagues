var mongoose = require('mongoose');

 var programSchema = new mongoose.Schema({
   content: String
 });

 module.exports = mongoose.model('Program', programSchema);