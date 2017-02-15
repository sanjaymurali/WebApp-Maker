(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($stateParams, WebsiteService) {
        var vm = this;
        vm.userId = $stateParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = null;
            vm.error = false;
        }
        init();

        function createWebsite (website) {
            if(vm.website){
                var addNew = WebsiteService.createWebsite(vm.userId, website);

                if(addNew != null){
                    vm.websites.push(addNew);
                    vm.message = "Successfully Created new website!";
                }
            }
            else
                vm.error = "There was an error in Creating the Website";
        };
    }
})();