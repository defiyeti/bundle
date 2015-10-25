'use strict';
angular.module('bundle')
.factory('CordovaService', function ($http, $q, $cordovaBarcodeScanner) {
    var exports = {
        scan: $cordovaBarcodeScanner.scan
    };

    
    return exports;
});