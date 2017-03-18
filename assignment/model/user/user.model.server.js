/**
 * Created by sanjaymurali on 3/17/17.
 */

module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function updateUser(userId, changedUser) {
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
        return UserModel.update({_id: userId}, { $set: updatedUser});
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }
};