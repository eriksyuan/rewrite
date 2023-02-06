var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        this._status = "pedding";
        this._queueOnFulfilledCallback = [];
        this._queueOnRejectedCallback = [];
        this._resolve = this._resolve.bind(this);
        this._reject = this._reject.bind(this);
        try {
            executor(this._resolve, this._reject);
        }
        catch (error) {
            this._reject(error);
        }
    }
    MyPromise.prototype._resolve = function (res) {
        // add to Microtask queue
        if (this._status === "pedding") {
            this._status = "resolve";
            this._res = res;
            for (var _i = 0, _a = this._queueOnFulfilledCallback; _i < _a.length; _i++) {
                var onFulfilled = _a[_i];
                onFulfilled(res);
            }
            this._queueOnFulfilledCallback = [];
        }
    };
    MyPromise.prototype._reject = function (err) {
        if (this._status === "pedding") {
            this._status = "reject";
            this._err = err;
            for (var _i = 0, _a = this._queueOnRejectedCallback; _i < _a.length; _i++) {
                var onRejected = _a[_i];
                onRejected(err);
            }
            this._queueOnRejectedCallback = [];
        }
    };
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        var p2 = new MyPromise(function (resolve, reject) {
            var _onFulfilled = function (res) {
                try {
                    var x = onFulfilled(_this._res);
                    if (p2 === x) {
                        return reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
                    }
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject);
                    }
                    else {
                        resolve(x);
                    }
                }
                catch (error) {
                    reject(error);
                }
            };
            var _onRejected = onRejected
                ? function (err) {
                    try {
                        var _err = onRejected(err);
                        reject(_err);
                    }
                    catch (error) {
                        reject(error);
                    }
                }
                : undefined;
            if (_this._status === "pedding") {
                _this._queueOnFulfilledCallback.push(_onFulfilled);
                if (_onRejected) {
                    _this._queueOnRejectedCallback.push(_onRejected);
                }
            }
            else if (_this._status === "resolve") {
                queueMicrotask(function () {
                    _onFulfilled(_this._res);
                });
            }
            else {
                _onRejected && _onRejected(_this._err);
            }
        });
        return p2;
        // return this;
    };
    return MyPromise;
}());
MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};
module.exports = MyPromise;
