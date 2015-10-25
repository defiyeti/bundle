
angular.module('bundle')
.factory('Utils', function ($q, $interval) {

    /* generic Task factory */
    function Task(execFn) {
        var deferred = $q.defer();
        var callbacks = {};
        var errorCallbacks = {};
        var result;
        var fn;
        fn = {
            then: function (success, err) {
                if(execFn.then) {
                    return execFn.then(success);
                } else {
                    var promise = execFn();
                    if (promise && promise.then) {
                        return promise.then(success);
                    } else {
                        try {
                            return success(promise);
                        } catch (e) {
                            return err(e);
                        }
                    }
                }
            }
        };
        return {
            exec: function () {
                fn.then(
                    function (res) {
                        result = res;
                        return $q.all(_.map(callbacks, function (cb) { cb(res); }));
                    },
                    function (err) {

                        return $q.all(_.map(errorCallbacks, function (cb) { cb(err); }));
                    }
                ).then(function () {
                    deferred.resolve(result);
                    return result;
                });
            },
            registerCallback: function (name, cb) {
                callbacks[name] = function () {
                    callbacks[name] = cb.apply(cb, arguments);
                };
            },
            unregisterCallback: function (name) {
                delete callbacks[name];
            },
            registerErrorCallback: function (name, cb) {
                errorCallbacks[name] = cb;
            },
            unregisterErrorCallback: function (name) {
                delete errorCallbacks[name];
            },
            getCallback: function (name) {
                return callbacks[name];
            },
            result: function () {
                return result;
            },
            promise: deferred.promise

        };
    }

    /* Task Queue
        parameters: 
         - conditional function. when this returns true, the queue will start executing.
         - interval to check conditional function
     */

    function TaskQueue(conditionalFn, ms, maxCall, retry) {
        var queue = [];
        var inProg = [];
        var complete = [];
        var interval = $interval(
            function () {
                var task = null;
                if(conditionalFn() && queue.length && inProg.length < (maxCall || 3)) {
                    task = queue.pop();
                    task.registerCallback('$skurt:task-complete', function () {
                        inProg.splice(inProg.indexOf(task), 1);
                        complete.push(task);
                    });
                    task.registerErrorCallback('$skurt:task-retry', function () {
                        inProg.splice(inProg.indexOf(task), 1);
                        if (retry) {
                            queue.push(task);
                        } else {
                            complete.push(task);
                        }
                    });
                    task.exec();
                    inProg.push(task);
                }
            },
            ms
        );

        return {
            push: function (task) {
                queue.push(task);
            },
            pop: function () {
                return queue.pop();
            },
            forceNext: function () {
                var task = queue.pop();
                task.registerCallback('$skurt:task-complete', function () {
                    inProg.splice(inProg.indexOf(task), 1);
                    complete.push(task);
                });
                task.registerErrorCallback('$skurt:task-retry', function () {
                    inProg.splice(inProg.indexOf(task), 1);
                    if (retry) {
                        queue.push(task);
                    } else {
                        complete.push(task);
                    }
                });
                task.exec();
                inProg.push(task);
            }
        };
    }


    return {
        Task: Task,
        TaskQueue: TaskQueue
    };
});