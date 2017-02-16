/**
 * Created by sanjaymurali on 2/14/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $state) {
        var vm = this;

        function init() {
            vm.user = {};
            vm.error = false;
            vm.register = register;
        }

        init();

        function register(user) {
            if (user.password === user.verifyPassword) {
                var registerUser = UserService.createUser(user);
                if (registerUser != null) {
                    $state.go('profile', {uid: registerUser._id});
                } else {
                    vm.error = 'Unable to register!';
                }
            }
            else
                vm.error = 'Passwords Do not Match!';
        }

    }
})();