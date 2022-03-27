var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Friends2Colleagues - A portal to gear you up!' });
});

router.route('/signin')
.get(function(request, response, next){
  response.render('signin', { title: 'Friends2Colleagues - Sign In!' });
})
.post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

router.route('/signup')
  .get(function(request, response, next) {
    response.render('signup', { title: 'Friends2Colleagues - Sign Up!' });
  }).post(function(request, response, next){
  var name = request.body.name;
  var email = request.body.email;
  var password = request.body.password;
  var confirmPassword = request.body.confirm_Password;
  request.checkBody('name', 'Empty Name').notEmpty();
  request.checkBody('email', 'Invalid Email').isEmail();
  request.checkBody('password', 'Empty Password').notEmpty();
  request.checkBody('password', 'Confirm Password and Password do not match').equals(confirmPassword).notEmpty();

  var errs = request.ationErrors();
  if (errs) {
    response.render('signup', {
      name: request.body.name,
      email: request.body.email,
      errorMessages: errs
    });
  } else {
    var user = new User();
    user.email = email;
    user.name = name;
    user.setPass(password);
    user.save(function (error) {
      if (error) {
        response.render('signup', {errorMessages: error});
      } else {
        response.redirect('/signin');
      }
    })
  }
});

module.exports = router;