angular.module('bundle')
.factory('PayeezyService', function ($q, $http) {
    // most of this stuff I haven't bothered to implement. If you guys would like to, go ahead.
    var methods = {
        paypal_transaction_details = {
            createPayment: function (data) {
                return $http.post('https://api.sandbox.paypal.com/v1/payments/payment', data)
            }
        },
        touchId = {

        }
    }
    // TODO IMPLEMENT PAYPAL OR TOUCHID
    function payeezy(method, verb, amount, current, merchant, data) {
        var deferred = $q.defer();
        var payload = {
            amount: amount,
            transaction_type: verb,
            
        };
        methods[method](data).then(
            function (method_payload) {
                payload[method] = method_payload;
                $http({
                    method: 'POST',
                    url: 'https://api-cert.payeezy.com/v1/transactions',
                    headers: {
                        apikey: 'y6pWAJNyJyjGv66IsVuWnklkKUPFbb0a',
                        Authorization: 'MTAzYWExZDY3OTZhY2JiN2ZiOTRmY2M3MjIyODE4NDRlMDhmMmM3NGYyYWM5MWYzZGYwZjUxYzQ3YjdhNDc4OA',
                        // etc. etc.
                    }
                }, payload)
                .then(deferred.resolve, deferred.reject);
            }
        )
        
        return deferred.promise;
    }
})