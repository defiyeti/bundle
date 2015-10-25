'use strict';
angular.module('bundle')
.directive('onFilePick', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var onChangeHandler = scope.$eval(attrs.onFilePick);
            elem.bind('change', onChangeHandler);
        }
    }
});