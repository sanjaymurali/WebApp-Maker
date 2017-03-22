/**
 * Created by sanjaymurali on 3/20/17.
 */

module.exports = function () {

    var userModel = require('./user/user.model.server');
    var websiteModel = require('./website/website.model.server');
    var pageModel = require('./page/page.model.server');
    var widgetModel = require('./widget/widget.model.server');

    var model = {
        userModel: userModel(),
        websiteModel: websiteModel(),
        pageModel: pageModel(),
        widgetModel: widgetModel()
    };

    return model;
};