(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($state, $stateParams, UserService, resolvedJson) {
        var vm = this;


        function init() {
            var userJson = resolvedJson.data;
            var user = {};
            vm.userId = $stateParams['uid'];

            if(userJson.success){
                user = userJson.user;
                vm.user = user;
            }
            else
                vm.error = 'Error';

            vm.update = update;
        }

        init();

        function update(newUser) {
            console.log(newUser);
            var user = {};
                UserService
                .updateUser(vm.userId, newUser)
                .then(function(response){
                    if(response.statusText === "OK"){
                        var json = response.data;
                        vm.user = json.user;
                        vm.message = "User successfully updated"
                    }
                    else
                        vm.error = "Unable to update user";
                });

        };
    }
})();