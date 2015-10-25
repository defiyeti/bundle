angular.module('bundle')
.controller('DashboardCtrl', function ($scope, $q, Utils, CordovaService, UPCService) {
    var Task = Utils.Task;
    var items = [];

    // INITIALIZE SCOPE
    $scope.startScan = function () {
        var task = new Task(function () {
            return CordovaService.scan();
        });
        task.registerCallback('data', UPCService.getItemInfo);
        items.push(task);
        task.exec();
    };
    $scope.items = function () {
        return _.map(items, function (item) {
            return item.getCallback('data');
        });
    };
});