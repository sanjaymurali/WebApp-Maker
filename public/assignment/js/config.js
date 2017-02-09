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
                templateUrl: 'views/user/login.view.client.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/user/register.view.client.html'
            })
            .state('profile', {
                url: '/user/:uid',
                templateUrl: 'views/user/profile.view.client.html'
            }).state('website', {
                url: '/user/:uid/website',
                templateUrl: 'views/website/website-list.view.client.html'
            }).state('website.new', {
                url: '/new',
                templateUrl: 'views/website/website-new.view.client.html'
            }).state('website.edit', {
                url: '/:wid',
                templateUrl: 'views/website/website-edit.view.client.html'
            }).state('page', {
                url: '/user/:uid/website/:wid/page',
                templateUrl: 'views/page/page-list.view.client.html'
            }).state('page.new', {
                url: '/new',
                templateUrl: 'views/page/page-new.view.client.html'
            }).state('page.edit', {
                url: '/:pid',
                templateUrl: 'views/page/page-edit.view.client.html'
            }).state('widget', {
                url: '/user/:uid/website/:wid/page/:pid/widget',
                templateUrl: 'views/widget/widget-list.view.client.html'
            }).state('widget.new', {
                url: '/new',
                templateUrl: 'views/widget/widget-choose.view.client.html'
            }).state('widget.edit', {
                url: '/:wgid',
                templateUrl: 'views/widget/widget-edit.view.client.html'
            });

        $urlRouterProvider.otherwise('/login');
    }

    WebAppMakerModule.config(configuration);


})();