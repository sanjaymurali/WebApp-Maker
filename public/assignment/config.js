/**
 * Created by sanjaymurali on 2/7/17.
 */

(function () {
    var WebAppMakerModule = angular.module('WebAppMaker');

    var configuration = function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider, $httpProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });

        $urlMatcherFactoryProvider.strictMode(false); //To ignore diff b/w trailing slash

        $urlRouterProvider.when('/user/', '/login'); //look at this , if there are problems

        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        //$httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        var userJSON = {
            resolvedJson: function ($stateParams, UserService) {
                return UserService
                    .findUserById($stateParams['uid'])
                    .then(function (response) {
                        return response;
                    }, function(err){
                    });
            }
        };
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
                controllerAs: 'model',
                resolve: userJSON
            })
            .state('website', {
                url: '/user/:uid/website',
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model'
            })
            .state('website-new', {
                url: '/user/:uid/website/new',
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'model'
            })
            .state('website-edit', {
                url: '/user/:uid/website/:wid',
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'model'
            })
            .state('page', {
                url: '/user/:uid/website/:wid/page',
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model'
            })
            .state('page-new', {
                url: '/user/:uid/website/:wid/page/new',
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: 'NewPageController',
                controllerAs: 'model'
            })
            .state('page-edit', {
                url: '/user/:uid/website/:wid/page/:pid',
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'model'
            })
            .state('widget', {
                url: '/user/:uid/website/:wid/page/:pid/widget',
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'model'
            })
            .state('widget-new', {
                url: '/user/:uid/website/:wid/page/:pid/widget/new',
                templateUrl: '/views/widget/templates/widget-choose.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'model'
            })
            .state('widget-flickr', {
                url: '/user/:uid/website/:wid/page/:pid/widget/new/flickr',
                templateUrl: '/views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model'
            })
            .state('widget-new-specific', {
                url: '/user/:uid/website/:wid/page/:pid/widget/new/:specific',
                templateUrl: '/views/widget/templates/widget-choose.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'model'
            })
            .state('widget-edit', {
                url: '/user/:uid/website/:wid/page/:pid/widget/:wgid',
                templateUrl: '/views/widget/templates/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'model'
            });

        $urlRouterProvider.otherwise('/login');
    }

    WebAppMakerModule.config(configuration);

})();