(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($stateParams, $state, PageService, helperService) {
        var vm = this;


        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.pageId = $stateParams['pid'];

            vm.deletePage = deletePage;
            vm.updatePage = updatePage;
            PageService.findPageByWebsiteId(vm.websiteId).then(function (response) {
                if (response.statusText === "OK")
                    vm.pages = response.data.pages;
            });
            PageService.findPageById(vm.pageId).then(function (response) {
                if (response.statusText === "OK")
                    vm.page = response.data.page;
            });

            vm.alertOpenClose = alertOpenClose;
            vm.success = false;
            vm.error = false;
        }

        init();

        function deletePage() {
            cleanUpAlerts();
            PageService.deletePage(vm.pageId);
            PageService.findPageByWebsiteId(vm.websiteId).then(function (response) {
                if (response.statusText === "OK") {
                    vm.pages = response.data.pages;
                    if (vm.pages.length == 0) {
                        $state.go('page-new', {uid: vm.userId, wid: vm.websiteId});
                    }
                    else
                        $state.go('page-edit', {uid: vm.userId, wid: vm.websiteId, pid: vm.pages[0]._id});
                }
            });


        }

        function updatePage() {
            cleanUpAlerts();
            PageService.updatePage(vm.pageId, vm.page).then(function (response) {
                if (response.statusText === "OK") {
                    for (var current in vm.pages) {
                        if (vm.pages[current]._id === response.data.page._id) {
                            vm.pages[current] = response.data.page;
                        }
                    }
                    vm.success = true;
                    vm.successMessage = "Page successfully updated"
                }
                else {
                    vm.error = true;
                    vm.errorMessage = "Unable to update page";
                }
            });

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