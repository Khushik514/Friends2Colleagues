var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Friends2Colleagues - A portal to gear you up!' });
});

module.exports = router;
