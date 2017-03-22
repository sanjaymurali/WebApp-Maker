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
            // Remove this later
            if (user.password === undefined || user.verifyPassword === undefined || user.username === undefined)
                vm.error = "Unable to Register";
            else {
                if (user.password === user.verifyPassword) {
                    var registerUser = {};
                    UserService
                        .findUserByUsername(user.username)
                        .then(function (response) {
                            if(response.data.user)
                                vm.error = 'Change the Username';
                            else {
                                UserService
                                    .createUser(user)
                                    .then(function (response) {
                                        if (response.statusText === "OK") {
                                            var json = response.data;
                                            $state.go('profile', {uid: json.user._id});
                                        }
                                        else
                                            vm.error = 'Unable to register!';
                                    });
                            }
                    }, function (error) {
                            vm.error = 'Unable to register!';
                    })

                }
                else
                    vm.error = 'Passwords Do not Match!';
            }

        }

    }
})();