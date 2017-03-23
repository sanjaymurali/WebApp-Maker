(function () {
    angular
        .module("WebAppMaker")
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController($stateParams, $state, FlickrService, WidgetService) {
        var vm = this;
        vm.userId = $stateParams['uid'];
        vm.websiteId = $stateParams['wid'];
        vm.pageId = $stateParams['pid'];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto  = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                }, function(err) {

                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {};
            widget.url = url;
            widget.widgetType = "IMAGE";
            widget.width = "100%";

            WidgetService.createWidget(vm.pageId, widget).then(function(widget){
                $state.go('widget', {uid: vm.userId, wid: vm.websiteId, pid: vm.pageId});
            });
        }
    }
})();
