/**
 * Created by sanjaymurali on 2/17/17.
 */

module.exports = function (app) {

    var userModel = require('./model/user/user.model.server')();

    require("./services/user.service.server.js")(app, userModel);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);

    // app.use(errorInRoute);


};