(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    
    function profileController($state, $stateParams, UserService) {
        console.log("In here!");
        var vm = this;
        var userId = $stateParams['uid'];

        vm.navBarName = $state.current.data.pageName;

        vm.update = function (newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };

        var user = UserService.findUserById(userId);
        vm.user = user;

        console.log(user);
    }
})();