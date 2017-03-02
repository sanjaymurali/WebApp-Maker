(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($stateParams, PageService, helperService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];

            PageService.findPageByWebsiteId(vm.websiteId).then(function (response) {
                if (response.statusText === "OK")
                    vm.pages = response.data.pages;
            });

            vm.createPage = createPage;
            vm.page = null;

            vm.alertOpenClose = alertOpenClose;
            vm.success = false;
            vm.error = false;
        }

        init();

        function createPage(page) {
            cleanUpAlerts();
            if (vm.page) {
                PageService.createPage(vm.websiteId, page).then(function (response) {
                    if (response.statusText === "OK") {
                        var addNew = response.data.page;
                        vm.pages.push(addNew);
                        vm.success = true;
                        vm.successMessage = "Successfully Created new page!";
                        vm.page = null;
                    }
                    else {
                        vm.error = true;
                        vm.errorMessage = "There was an error in Creating the page";
                    }

                });


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