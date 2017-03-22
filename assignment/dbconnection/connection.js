/**
 * Created by sanjaymurali on 3/17/17.
 */

module.exports = function (app) {

    var connectionString = 'mongodb://127.0.0.1:27017/webappmaker'; //Local connectionString


    if (process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

}