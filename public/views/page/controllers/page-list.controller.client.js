(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($stateParams, PageService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];

            PageService.findPageByWebsiteId(vm.websiteId).then(function (response) {
                if (response.statusText === "OK")
                    vm.pages = response.data.pages;
            });
        }

        init();
    }
})();