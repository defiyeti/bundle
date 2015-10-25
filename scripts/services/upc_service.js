angular.module('bundle')
.factory('UPCService', function ($q, $http) {
    function getItemInfo(upc) {
        var deferred = $q.defer();
        console.log(upc);
        $http.get('http://www.searchupc.com/handlers/upcsearch.ashx?request_type=3&access_token=C1555391-AB2D-40A7-9575-AF6F819FBF20&upc=' + upc.text)
        .then(function (res) {
            console.log(res.data);
            deferred.resolve(res.data['0']);
        });
        return deferred.promise;
    }

    return {
        getItemInfo: getItemInfo
    }
});