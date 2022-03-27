var Strategy = require('passport-local').Strategy;
 var passport = require('passport');

 passport.serializeUser(function(user, done)
 {
     done(null, user._id);
 }
 );

 passport.use(new Strategy({
     usernameField: 'email'
 },
 function(username, password, done)
 {
     User.findOne({email: username}, function(err, user)
     {
         if(err)
             return done(err);
         if(!user)
         {
             return done(null, false, 
                 {
                     message: 'Incorrect Username'
                 });
         }
         if(!user.validatePass(password))
         {
             console.log('Pass wrong');
             return done(null, false, 
                 {
                     message: 'Incorrect Password'
                 });
         }
         return done(null, user);
     }
     )
 }));

 passport.deserializeUser(function(id, done)
 {
     User.findOne({_id: id}, function(err, user)
     {
         done(err, user);
     })
 }
 ); 