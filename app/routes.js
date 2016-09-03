module.exports = function(app, passport) {

    // route for home page
    var appDetail=require("../package.json"),
    appName=appDetail.name.replace(/-/g," ");
    // route for home page

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('../public/views/profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.post('/getbars', function(req, res,next) {
        require("./getbars.js")(req,res,next);
    });
    app.get('/getgoing',isLoggedIn2, function(req, res,next) {
        require("./getgoing.js")(req,res,next);
    });
    app.post('/insertgoing',isLoggedIn2, function(req, res,next) {
      require("./insertgoing.js")(req,res,next);
    });
    app.post('/deletegoing',isLoggedIn2, function(req, res,next) {
      require("./deletegoing.js")(req,res,next);
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/checklogged',isLoggedIn2, function(req, res) {
      res.end('1');
    });

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/login/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/login/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/'
            }));

      app.get('*', function(req, res) {
          res.render('../public/views/index.ejs',{
            logged:req.isAuthenticated(),
              appName:appName
          }); // load the index.ejs file
      });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login/google');
}
function isLoggedIn2(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).json([]);
}
