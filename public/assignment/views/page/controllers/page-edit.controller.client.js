(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($stateParams, $state, PageService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.pageId = $stateParams['pid'];
            vm.deletePage = deletePage;
            vm.updatePage = updatePage;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId);
            $state.go('page', {uid: vm.userId, wid: vm.websiteId});
        }

        function updatePage () {
            var udpatedPage = PageService.updatePage(vm.pageId,vm.page);

            if(udpatedPage == null) {
                vm.error = "Unable to update page";
            } else {
                vm.message = "Page successfully updated"
            }
        }
    }
})();