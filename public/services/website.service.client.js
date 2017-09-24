(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var apiURL = '/api/user/';

        var api = {
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById": findWebsiteById,
            "findWebsitesByUser": findWebsitesByUser
        };
        return api;


        function deleteWebsite(websiteId) {
            return $http.delete('/api/website/' + websiteId);
        }

        function createWebsite(userId, website) {

            return $http.post(apiURL + userId + '/website/', website);

        }

        function updateWebsite(websiteId, website) {
            return $http.put('/api/website/' + websiteId, website);
        }

        function findWebsitesByUser(userId) {
            return $http.get(apiURL + userId + '/website/');

        }

        function findWebsiteById(wid) {
            return $http.get('/api/website/' + wid);

        }
    }
})();