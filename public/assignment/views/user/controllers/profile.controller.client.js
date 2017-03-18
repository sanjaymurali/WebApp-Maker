(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($state, $stateParams, UserService, resolvedJson) {
        var vm = this;


        function init() {

            var user = {};
            vm.userId = $stateParams['uid'];


            if (resolvedJson.statusText === "OK") {
                var userJson = resolvedJson.data;
                user = userJson.user;
                vm.user = user;
            }
            else
                vm.error = 'Error';

            vm.update = update;
            vm.unregisterUser = unregisterUser;
        }

        init();

        function update(newUser) {
            var user = {};
            UserService
                .updateUser(vm.userId, newUser)
                .then(function (response) {
                    if (response.statusText === "OK") {
                        vm.message = "User successfully updated"
                    }
                    else
                        vm.error = "Unable to update user";
                });

        }

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            if (answer) {
                UserService
                    .deleteUser(user._id)
                    .then(function (response) {
                        if (response.statusText === "OK")
                            $state.go('login');
                        else
                            vm.error = 'unable to remove user';
                    });
            }
        }
    }
})();