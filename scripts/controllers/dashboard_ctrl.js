angular.module('bundle')
.controller('DashboardCtrl', function ($scope, $q, Utils, CordovaService) {
    var Task = Utils.Task;
    var items = [];

    // INITIALIZE SCOPE
    $scope.startScan = function (f) {
        var task = new Task(function () {
            return CordovaService.scan();
        });
        task.registerCallback('data', function (result) {
            return result;
        });
        items.push(task);
        task.exec();
    };
    $scope.items = function () {
        return _.map(items, function (item) {
            return item.getCallback('data');
        });
    };
});