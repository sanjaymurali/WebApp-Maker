(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($stateParams, PageService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];

            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();
    }
})();