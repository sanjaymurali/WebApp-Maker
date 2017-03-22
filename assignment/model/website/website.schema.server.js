/**
 * Created by sanjaymurali on 3/21/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pages'}]
    }, {collection: 'websites',timestamps: {createdAt: 'dateCreated'}});

    return WebsiteSchema;
};