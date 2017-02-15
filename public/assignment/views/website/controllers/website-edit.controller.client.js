(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($stateParams, $state, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.deleteWebsite = deleteWebsite;
            vm.updateWebsite = updateWebsite;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $state.go('website', {uid: vm.userId});
        };

        function updateWebsite () {
            var udpatedWebsite = WebsiteService.updateWebsite(vm.websiteId,vm.website);

            if(udpatedWebsite == null) {
                vm.error = "Unable to update website";
            } else {
                vm.message = "Website successfully updated"
            }
        }
    }
})();