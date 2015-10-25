'use strict';
angular.module('bundle')
.factory('CordovaService', function ($http, $q) {
    var exports = {};
    document.addEventListener("deviceready", function () {
        exports.scan = function () {
            var deferred = $q.defer();
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    deferred.resolve(result);
                }, 
                function (error) {
                    deferred.reject(error);
                }
            );
            return deferred.promise;
        }
    }, false);

    
    return exports;
});