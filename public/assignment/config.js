/**
 * Created by sanjaymurali on 2/7/17.
 */

(function () {
    var WebAppMakerModule = angular.module('WebAppMaker');

    var configuration = function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });

        $urlMatcherFactoryProvider.strictMode(false); //To ignore diff b/w trailing slash

        $urlRouterProvider.when('/user/', '/login'); //look at this , if there are problems

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .state('profile', {
                url: '/user/:uid',
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            }).state('website', {
                url: '/user/:uid/website',
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model'
            }).state('website-new', {
                url: '/user/:uid/website/new',
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'WebsiteNewController',
                controllerAs: 'model'
            }).state('website-edit', {
                url: '/user/:uid/website/:wid',
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'WebsiteEditController',
                controllerAs: 'model'
            }).state('page', {
                url: '/user/:uid/website/:wid/page',
                templateUrl: 'views/page/templates/page-list.view.client.html'
            }).state('page-new', {
                url: '/user/:uid/website/:wid/page/new',
                templateUrl: "views/page/templates/page-new.view.client.html"
            }).state('page-dit', {
                url: '/user/:uid/website/:wid/page/:pid',
                templateUrl: 'views/page/templates/page-edit.view.client.html'
            }).state('widget', {
                url: '/user/:uid/website/:wid/page/:pid/widget',
                templateUrl: 'views/widget/templates/widget-list.view.client.html'
            }).state('widget-new', {
                url: '/user/:uid/website/:wid/page/:pid/widget/new',
                templateUrl: 'views/widget/templates/widget-choose.view.client.html'
            }).state('widget-edit', {
                url: '/user/:uid/website/:wid/page/:pid/widget/:wgid',
                templateUrl: 'views/widget/templates/widget-edit.view.client.html'
            });

        $urlRouterProvider.otherwise('/login');
    }

    WebAppMakerModule.config(configuration);

})();