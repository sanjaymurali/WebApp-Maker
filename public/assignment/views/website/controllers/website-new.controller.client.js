(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($stateParams, WebsiteService, helperService) {
        var vm = this;


        function init() {
            vm.userId = $stateParams['uid'];

            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.createWebsite = createWebsite;
            vm.website = null;

            vm.alertOpenClose = alertOpenClose;
            vm.error = false;
            vm.success = false;
        }

        init();

        function createWebsite(website) {
            cleanUpAlerts();
            if (vm.website) {
                var addNew = WebsiteService.createWebsite(vm.userId, website);

                if (addNew != null) {
                    vm.websites.push(addNew);
                    vm.success = true;
                    vm.successMessage = "Successfully Created new website!";
                    vm.website = null;
                }
                else {
                    vm.error = true;
                    vm.errorMessage = "There was an error in Creating the Website";
                }
            }
            else {
                vm.error = true;
                vm.errorMessage = "There was an error in Creating the Website";
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