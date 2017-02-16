(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($stateParams, $state, PageService, helperService) {
        var vm = this;


        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.pageId = $stateParams['pid'];

            vm.deletePage = deletePage;
            vm.updatePage = updatePage;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);

            vm.alertOpenClose = alertOpenClose;
            vm.success = false;
            vm.error = false;
        }

        init();

        function deletePage() {
            cleanUpAlerts();
            PageService.deletePage(vm.pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

            if (vm.pages.length == 0) {
                $state.go('page-new', {uid: vm.userId, wid: vm.websiteId});
            }
            else
                $state.go('page-edit', {uid: vm.userId, wid: vm.websiteId, pid: vm.pages[0]._id});
        }

        function updatePage() {
            cleanUpAlerts();
            var udpatedPage = PageService.updatePage(vm.pageId, vm.page);

            if (udpatedPage == null) {
                vm.error = true;
                vm.errorMessage = "Unable to update page";
            } else {
                vm.success = true;
                vm.successMessage = "Page successfully updated"
            }
        }

        function alertOpenClose(successOrError) {
            vm.success = helperService.alertOpenClose(successOrError);
            vm.error = helperService.alertOpenClose(successOrError);
        }

        function cleanUpAlerts() {
            vm.success = false;
            vm.error = false;
        }
    }
})();