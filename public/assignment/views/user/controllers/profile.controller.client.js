(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    
    function profileController($state, $stateParams, UserService) {
        var vm = this;
        var userId = $stateParams['uid'];
        vm.update = update;

        function update(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "Unable to update user";
            } else {
                vm.message = "User successfully updated"
            }
        };

        function init(){
            var user = UserService.findUserById(userId);
            vm.user = user;
        }
        init();
    }
})();