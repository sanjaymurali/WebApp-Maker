(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($state, $stateParams, UserService) {
        var vm = this;


        function init() {
            vm.userId = $stateParams['uid'];

            var user = UserService.findUserById(vm.userId);
            vm.user = user;
            vm.update = update;
        }

        init();

        function update(newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if (user == null) {
                vm.error = "Unable to update user";
            } else {
                vm.message = "User successfully updated"
            }
        };
    }
})();