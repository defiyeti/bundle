'use strict';
angular.module('bundle')
.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
        url: '/home',
        views: {
            home: {
              templateUrl: 'views/home.html'
            }
        }
    })
    .state('help', {
        url: '/help',
        controller: 'DashboardCtrl',
        views: {
            home: {
              templateUrl: 'views/help.html'
            }
        }
    });
});