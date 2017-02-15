/**
 * Created by sanjaymurali on 2/15/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem", "title": "Title 1" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem", "title": "Title 2" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem", "title": "Title 3" }
        ];
        var api = {
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findPageById": findPageById,
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;


        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime() + "";

            pages.push(page);
            return angular.copy(page);
        }

        function updatePage(pageId,page){
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p].name = page.name;
                    pages[p].title = page.title;
                    return page;
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var combinedPages = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    combinedPages.push(pages[p]);
                }
            }
            return combinedPages;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
    }
})();