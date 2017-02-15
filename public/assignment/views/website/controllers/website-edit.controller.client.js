(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($stateParams, $state, WebsiteService, helperService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.deleteWebsite = deleteWebsite;
            vm.updateWebsite = updateWebsite;
            vm.alertOpenClose = alertOpenClose;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.success = false;
            vm.error = false;
        }
        init();

        function deleteWebsite () {
            cleanUpAlerts();
            WebsiteService.deleteWebsite(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            if(vm.websites.length == 0){
                $state.go('website-new', {uid: vm.userId});
            }
            else
                $state.go('website-edit', {uid:vm.userId,wid:vm.websites[0]._id});
        }

        function updateWebsite () {
            cleanUpAlerts();
            var udpatedWebsite = WebsiteService.updateWebsite(vm.websiteId,vm.website);

            if(udpatedWebsite == null) {
                vm.error = true;
                vm.errorMessage = "Unable to update website";
            } else {
                vm.success = true;
                vm.successMessage = "Website successfully updated"
            }
        }

        function alertOpenClose (successOrError) {
            vm.success = helperService.alertOpenClose(successOrError);
            vm.error = helperService.alertOpenClose(successOrError);
        }

        function cleanUpAlerts () {
            vm.success = false;
            vm.error = false;
        }
    }
})();