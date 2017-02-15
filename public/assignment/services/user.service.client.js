/**
 * Created by sanjaymurali on 2/9/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" , email: "bob@gmail.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",email: "jose@gmail.com" }
        ];

        var api = {
            "users": users,
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername
        };
        return api;

        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email = newUser.email;
                    users[u].username = newUser.username;
                    return user;
                }
            }
            return null;
        }

        function createUser(user){

            //Adding a id using the milliseconds property on Date.
            //This is a hack to generate as many new ids as possible
            user._id  = (new Date()).getTime() + "";;
            delete user['verifyPassword'];
            users.push(user);

            return user;
        }

        function deleteUser(userId){
            var userIdToString = userId+"";
            for(var u in users) {
                var user = users[u];
                if(user._id === userIdToString) {
                    return users.splice(u,1);
                }
            }

            return null;
        }

        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if(user._id === uid) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username) {
                    return angular.copy(user);
                }
            }
            return null;
        }
    }
})();