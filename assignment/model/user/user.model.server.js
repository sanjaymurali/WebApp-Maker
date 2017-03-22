/**
 * Created by sanjaymurali on 3/17/17.
 */

module.exports = function () {

    var api = {
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    };

    var mongoose = require('mongoose');

    var q = require('q');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user)
        });

        return deferred.promise;
    }

    function deleteUser(userId) {

        var deferred = q.defer();
        UserModel.remove({_id: userId}, function (err, status) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(status)
        });

        return deferred.promise;
    }

    function updateUser(userId, changedUser) {
        var deferred = q.defer();

        var updatedUser = {};
        var updatedProperties = Object.getOwnPropertyNames(changedUser);
        var schemaProp = Object.getOwnPropertyNames(UserModel.schema.obj);

        if (changedUser._id === userId) {
        for (i = 0; i < schemaProp.length; i++) {
                for (j = 0; j < updatedProperties.length; j++) {
                    if (schemaProp[i] === updatedProperties[j]
                        && updatedProperties[j] != '_id'){
                        updatedUser[updatedProperties[j]] = changedUser[updatedProperties[j]];
                    }


                }
            }
        }

        UserModel.findByIdAndUpdate({_id: userId}, { $set: updatedUser}, {new: true}, function (err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.findOne({username: username, password: password}, function (err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;
    }
};