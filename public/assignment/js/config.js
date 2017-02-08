/**
 * Created by sanjaymurali on 2/7/17.
 */

(function(){
   var WebAppMakerModule = angular.module('WebAppMaker');

    var configuration = function($stateProvider,$urlRouterProvider,$locationProvider){
        $locationProvider.html5Mode({
            enabled: true
        });

        $stateProvider
            .state('login',{
            url: '/login',
            templateUrl: 'views/user/login.view.client.html'
            })
            .state('register',{
            url: '/register',
            templateUrl: 'views/user/register.view.client.html'
            })
            .state('profile',{
                url: '/user/:uid',
                templateUrl: 'views/user/profile.view.client.html'



            });

        $urlRouterProvider.otherwise('/login');
    }

    WebAppMakerModule.config(configuration);


})();