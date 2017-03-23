/**
 * Created by sanjaymurali on 2/17/17.
 */

module.exports = function (app) {


    // Contains all the Model: User, Website, Page and Widget
    var models = require('./model/models.server')();

    require("./services/user.service.server.js")(app, models.userModel);
    require("./services/website.service.server.js")(app, models.websiteModel, models.userModel);
    require("./services/page.service.server.js")(app, models.pageModel, models.websiteModel);
    require("./services/widget.service.server.js")(app, models.widgetModel, models.pageModel);



};