/**
 * Created by sanjaymurali on 3/22/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var widgetTypes = ['HEADER', 'IMAGE', 'HTML', 'YOUTUBE', 'TEXT'];
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Pages'},
        name: String,
        widgetType: {type: String, enum: widgetTypes},
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        sortable: Number
    }, {collection: 'widgets',timestamps: {createdAt: 'dateCreated'}});

    return WidgetSchema;
};