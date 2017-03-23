/**
 * Created by sanjaymurali on 3/21/17.
 */

module.exports = function () {

    var api = {
        createPage: createPage,
        updatePage: updatePage,
        deletePage: deletePage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    return api;

    function deletePage(pageId) {

        var deferred = q.defer();

        PageModel.remove({_id: pageId}, function (err, status) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(status)
        });

        return deferred.promise;
    }

    function createPage(websiteId, page) {

        page._website = websiteId; //Set the websiteId for the Page
        var deferred = q.defer();
        PageModel.create(page, function (err, page) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(page)
        });

        return deferred.promise;
    }

    function updatePage(pageId, page) {

        var deferred = q.defer();

        PageModel.update({_id: pageId}, {$set: page, $setOnInsert: page}, function (err, page) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(page);
        });

        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {

        var deferred = q.defer();
        PageModel.find({_website: websiteId}, function (err, pages) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(pages);
        });

        return deferred.promise;
    }

    function findPageById(pageId) {

        var deferred = q.defer();
        PageModel.findById(pageId, function (err, page) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(page);
        });

        return deferred.promise;
    }
};