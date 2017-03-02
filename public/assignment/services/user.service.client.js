/**
 * Created by sanjaymurali on 2/9/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {

        var apiURL = '/api/';

        var api = {
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername
        };
        return api;

        function updateUser(userId, newUser) {
            return $http.put(apiURL + 'user/' + userId, newUser);
        }

        function createUser(user) {
            return $http.post(apiURL + 'user', user);
        }

        function deleteUser(userId) {
            return $http.delete(apiURL + 'user/' + userId);
        }

        function findUserById(uid) {
            return $http.get(apiURL + 'user/' + uid);
        }

        function findUserByCredentials(username, password) {
            return $http.get(apiURL + 'user', {params: {username: username, password: password}});
        }

        function findUserByUsername(username) {
            return $http.get(apiURL + 'user', {params: {username: username}});
        }
    }
})();