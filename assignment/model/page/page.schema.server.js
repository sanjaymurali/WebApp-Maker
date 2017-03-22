/**
 * Created by sanjaymurali on 3/21/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Websites'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Widgets'}],
    }, {collection: 'pages',timestamps: {createdAt: 'dateCreated'}});

    return PageSchema;
};