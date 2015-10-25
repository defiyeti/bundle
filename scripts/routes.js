'use strict';
angular.module('bundle')
.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    function basepath(path) {
        return ['views'].concat(path).join('/');
    };

    $urlRouterProvider.otherwise('/app/barcode');

    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: basepath(['app.html'])
    })
    .state('app.barcode', {
        url: '/barcode',
        controller: 'DashboardCtrl',
        templateUrl: basepath(['dashboard.html'])
    });
});