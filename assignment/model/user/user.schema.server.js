/**
 * Created by sanjaymurali on 3/17/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Websites'}]
    },{collection: 'users', timestamps: {createdAt: 'dateCreated'}});

    return UserSchema;
};