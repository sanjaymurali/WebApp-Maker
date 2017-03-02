(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($stateParams, $state, WebsiteService, helperService) {
        var vm = this;


        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];

            vm.deleteWebsite = deleteWebsite;
            vm.updateWebsite = updateWebsite;

            vm.websites = {};
            vm.website = {};
            WebsiteService.findWebsitesByUser(vm.userId).then(function (response) {
                if (response.statusText === "OK") {
                    vm.websites = response.data.websites;
                }
            });

            WebsiteService.findWebsiteById(vm.websiteId).then(function (response) {
                if (response.statusText === "OK") {
                    vm.website = response.data.website;
                }
            });

            vm.alertOpenClose = alertOpenClose;
            vm.success = false;
            vm.error = false;
        }

        init();

        function deleteWebsite() {
            cleanUpAlerts();
            WebsiteService.deleteWebsite(vm.websiteId).then(function (response) {
                if (response.statusText === "OK") {
                    WebsiteService.findWebsitesByUser(vm.userId).then(function (response) {
                        vm.websites = response.data.websites;
                        if (vm.websites.length == 0) {
                            $state.go('website-new', {uid: vm.userId});
                        }
                        else
                            $state.go('website-edit', {uid: vm.userId, wid: vm.websites[0]._id});
                    });
                }
            });
        }

        function updateWebsite() {
            cleanUpAlerts();
            WebsiteService.updateWebsite(vm.websiteId, vm.website).then(function (response) {
                if (response.statusText === "OK") {
                    for (var current in vm.websites) {
                        if (vm.websites[current]._id === response.data.website._id) {

                            vm.websites[current] = response.data.website;
                        }
                    }

                    vm.success = true;
                    vm.successMessage = "Website successfully updated"

                } else {
                    vm.error = true;
                    vm.errorMessage = "Unable to update website";
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