(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($state, $stateParams, UserService, checkUserSession) {
        var vm = this;

        function init() {

            vm.userId = $stateParams['uid'];

            if(!checkUserSession) {}
            else {
                vm.user = checkUserSession;
            }

            vm.update = update;
            vm.unregisterUser = unregisterUser;
            vm.logout = logout;
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

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                        $state.go('login');
                    });

        }
    }
})();