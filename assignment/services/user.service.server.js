/**
 * Created by sanjaymurali on 2/17/17.
 */

module.exports = function (app, userModel) {

    app.get('/api/user', findUser);
    app.post('/api/user', createUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            firstName: "Alice",
            lastName: "Wonder",
            email: "alice@gmail.com"
        },
        {
            _id: "234",
            username: "bob",
            password: "bob",
            firstName: "Bob",
            lastName: "Marley",
            email: "bob@gmail.com"
        },
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            email: "charly@gmail.com"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            email: "jose@gmail.com"
        }
    ]; //This Array is just for reference, can remove it!

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
        if (req.query.username && req.query.password)
            findUserByCredentials(req, res);
        else
            findUserByUsername(req, res);
    }


};