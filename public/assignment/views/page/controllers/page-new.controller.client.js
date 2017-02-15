(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($stateParams, PageService, helperService) {
        var vm = this;
        vm.userId = $stateParams['uid'];
        vm.websiteId = $stateParams['wid'];


        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.createPage = createPage;
            vm.alertOpenClose = alertOpenClose;
            vm.page = null;
            vm.success = false;
            vm.error = false;
        }
        init();

        function createPage (page) {
            cleanUpAlerts();
            if(vm.page){
                var addNew = PageService.createPage(vm.websiteId, page);

                if(addNew != null){
                    vm.pages.push(addNew);
                    vm.success = true;
                    vm.successMessage = "Successfully Created new page!";
                    vm.page = null;
                }
            }
            else{
                vm.error = true;
                vm.errorMessage = "There was an error in Creating the page";
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