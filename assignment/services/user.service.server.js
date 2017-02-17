/**
 * Created by sanjaymurali on 2/17/17.
 */

module.exports = function (app) {
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
    ];

    app.get('/makerapi/user', queryStringCheck);
    app.post('/makerapi/user', createUser);
    app.get('/makerapi/user/:userId', findUserById);
    app.put('/makerapi/user/:userId', updateUser);
    app.delete('/makerapi/user/:userId', deleteUser);

    function createUser(req, res) {
        //Adding a id using the milliseconds property on Date.
        //This is a hack to generate as many new ids as possible
        var user = {
            _id: (new Date()).getTime() + "",
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        //Add condition here when dealing with DB
        users.push(user);
        res.json({success: true, user: user});
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var updatedProperties = Object.getOwnPropertyNames(req.body);
        for (var u in users) {
            var user = users[u];
            if (user._id === userId) {
                for(i=0;i<updatedProperties.length;i++){
                    if(
                        (users[u].hasOwnProperty(updatedProperties[i]))
                        && updatedProperties[i] != '_id')
                        users[u][updatedProperties[i]] = req.body[updatedProperties[i]];
                }
                return res.json({success: true, user: user});;
            }
        }
        res.json({success: false});
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        var userIdToString = userId + "";
        for (var u in users) {
            var user = users[u];
            if (user._id === userIdToString) {
                users.splice(u, 1);
                return res.json({success: true});
            }
        }
        res.json({success: false});

    }

    function findUserById(req,res) {
        var userId = req.params.userId + "";
        for (var u in users) {
            var user = users[u];
            if (user._id === userId) {
                return res.json({success: true, user: user});
            }
        }
        res.json({success: false});
    }

    function findUserByCredentials(req, res, next) {

        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            var user = users[u];
            if (user.username === username &&
                user.password === password) {
                return res.json({success: true, user: user});
            }
        }
        res.json({success: false});
    }

    function findUserByUsername(req, res, next) {

        var username = req.query.username;
        for (var u in users) {
            var user = users[u];
            if (user.username === username) {
                return res.json({success: true, user: user});
            }
        }
        res.json({success: false});
    }

    function queryStringCheck(req, res) {
        if (req.query.username && req.query.password)
            findUserByCredentials(req, res);
        else
            findUserByUsername(req, res);
    }


};