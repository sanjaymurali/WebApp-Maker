(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($stateParams, WebsiteService) {
        var vm = this;


        function init() {
            vm.userId = $stateParams['uid'];

            WebsiteService.findWebsitesByUser(vm.userId).then(function (response) {
                if (response.statusText === "OK") {
                    vm.websites = response.data.websites;
                }
            });
        }

        init();
    }
})();