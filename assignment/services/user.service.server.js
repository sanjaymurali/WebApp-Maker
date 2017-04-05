/**
 * Created by sanjaymurali on 2/17/17.
 */

module.exports = function (app, userModel) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login',passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin/:uid', loggedin);
    app.post('/api/register', register);

    app.get('/api/user', findUser);
    app.post('/api/user', createUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function loggedin(req, res) {
        var userid = req.params.uid;
        var requserid = !req.user ? "" : req.user._id + "";
        if(req.isAuthenticated() && requserid === userid)
            res.status(200).json({success: true, user: req.user});
        else
            res.status(200).json({success: false})
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user).then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.sendStatus(400);
                        } else {
                            res.status(200).json({user: user});
                        }
                    });
                }
            });
    }

    function login(req, res) {

        var user = req.user;
        /*
         This means that user isnt found, this is done to avoid
         401 unauthorized error, so by replacing done(null, false) with true
         I have made sure that the passport.authenticate middleware doesnt
         send the client a 401 unauthorized. This was getting printed
         in the console of the browser
         */
        if(user === true)
            return res.sendStatus(200);
        res.json({user: user});


    }

    function createUser(req, res) {
        var user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };

        userModel
            .createUser(user)
            .then(function (createduser) {
                res.status(200).json({user: createduser});
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;

        userModel.updateUser(userId, req.body).then(function(user){
            res.status(200).json({user: user});
        }, function (error) {
            res.sendStatus(500);
        });

    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel.deleteUser(userId).then(function(user){
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
    }

    function findUserById(req, res) {
        if(!req.user)
            return res.sendStatus(404);
        var userId = req.params.userId + "";

        userModel.
        findUserById(userId)
            .then(function (user) {
                res.status(200).json({user: user});
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findUserByCredentials(req, res, next) {
        var username = req.query.username;
        var password = req.query.password;
        
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.status(200).json({user: user});
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findUserByUsername(req, res, next) {
        var username = req.query.username;

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.status(200).json({user: user});
            }, function (err) {
                res.sendStatus(200);
            });
    }

    function findUser(req, res) {
        if (!req.query.username && !req.query.password)
            findUserByUsername(req, res);
        else
            findUserByCredentials(req, res);
    }

    //Session and Passport

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(!user) {
                        return done(null, true);
                    }
                    else {
                        if(user.username === username && user.password === password) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    }

                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }



};