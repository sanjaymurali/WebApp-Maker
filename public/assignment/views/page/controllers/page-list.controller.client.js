(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($stateParams, PageService) {
        var vm = this;
        vm.userId = $stateParams['uid'];
        vm.websiteId = $stateParams['wid'];

        function init(){
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();
    }
})();