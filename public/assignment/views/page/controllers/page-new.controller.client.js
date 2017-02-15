(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($stateParams, PageService) {
        var vm = this;
        vm.userId = $stateParams['uid'];
        vm.websiteId = $stateParams['wid'];
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = null;
            vm.error = false;
        }
        init();

        function createPage (page) {
            if(vm.page){
                var addNew = PageService.createPage(vm.websiteId, page);

                if(addNew != null){
                    vm.pages.push(addNew);
                    vm.message = "Successfully Created new page!";
                }
            }
            else
                vm.error = "There was an error in Creating the page";
        };
    }
})();