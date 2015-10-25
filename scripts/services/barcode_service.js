'use strict';
angular.module('bundle')
.factory('CordovaService', function ($http, $q, $cordovaBarcodeScanner) {
    var exports = {};
    document.addEventListener("deviceready", function () {
        exports.scan = $cordovaBarcodeScanner.scan;
    }, false);

    
    return exports;
});