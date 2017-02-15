(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($stateParams, WebsiteService) {
        var vm = this;
        vm.userId = $stateParams['uid'];

        function init(){
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }
})();