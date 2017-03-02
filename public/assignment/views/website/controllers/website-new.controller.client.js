(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($stateParams, WebsiteService, helperService) {
        var vm = this;


        function init() {
            vm.userId = $stateParams['uid'];

            WebsiteService.findWebsitesByUser(vm.userId).then(function (response) {
                if (response.statusText === "OK") {
                    vm.websites = response.data.websites;
                }
            });

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
                addNew.then(function (response) {
                    if (response.statusText === "OK") {
                        var newWebsite = response.data.website;
                        vm.websites.push(newWebsite);
                        vm.success = true;
                        vm.successMessage = "Successfully Created new website!";
                        vm.website = null;
                    }
                    else {
                        vm.error = true;
                        vm.errorMessage = "There was an error in Creating the Website";
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