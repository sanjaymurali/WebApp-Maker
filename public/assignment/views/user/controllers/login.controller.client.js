/**
 * Created by sanjaymurali on 2/9/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService,$state) {
        var vm = this;
        vm.login = login;



        function login(user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $state.go('profile',{uid: loginUser._id});
            } else {
                vm.error = 'user not found';
            }
        }
    }
})();