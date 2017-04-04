(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var key = "12c8bf3d390ebd524fe732f6eb8b28ad";
        var secret = "f039d9ae6a9f71d0";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var currentPhoto = {};

        var api = {
            "searchPhotos": searchPhotos,
            "getCurrentPhoto": getCurrentPhoto,
            "setCurrentPhoto": setCurrentPhoto
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function getCurrentPhoto() {
            console.log("in here!");
            return currentPhoto;
        }

        function setCurrentPhoto(photo) {
            currentPhoto = photo;
        }
    }
})();