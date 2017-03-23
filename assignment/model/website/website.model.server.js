/**
 * Created by sanjaymurali on 3/21/17.
 */


module.exports = function () {

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WebsiteSchema = require('./website.schema.server')();

    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
    return api;

    function deleteWebsite(websiteId) {

        var deferred = q.defer();

        WebsiteModel.remove({_id: websiteId}, function (err, status) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(status)
        });

        return deferred.promise;
    }

    function createWebsiteForUser(userId, website) {

        website._user = userId; //Set the userId for the website
        var deferred = q.defer();
        WebsiteModel.create(website, function (err, website) {
            if(err)
                deferred.reject(err);
            else {
                deferred.resolve(website)
            }
        });

        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();

        WebsiteModel.update({_id: websiteId}, {$set: website, $setOnInsert: website}, function (err, status) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(status);
        });

        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {

        var deferred = q.defer();
        WebsiteModel.find({_user: userId}, function (err, websites) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(websites);
        });

        return deferred.promise;
    }

    function findWebsiteById(websiteId) {

        var deferred = q.defer();
        WebsiteModel.findById(websiteId, function (err, website) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(website);
        });

        return deferred.promise;
    }

};