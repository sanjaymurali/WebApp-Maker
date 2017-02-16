(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($stateParams, WebsiteService) {
        var vm = this;


        function init() {
            vm.userId = $stateParams['uid'];

            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }
})();