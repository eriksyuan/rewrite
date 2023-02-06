type MyPromiseStatus = "pedding" | "resolve" | "reject";

class MyPromise<T, E> {
  _status: MyPromiseStatus = "pedding";
  _res: T;
  _err: E;
  _queueOnFulfilledCallback: ((res: T) => void)[] = [];
  _queueOnRejectedCallback: ((err: E) => void)[] = [];
  static deferred: () => {};
  constructor(
    executor: (resolve: (a: T) => void, reject: (e: E) => void) => void
  ) {
    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);

    try {
      executor(this._resolve, this._reject);
    } catch (error) {
      this._reject(error);
    }
  }
  _resolve(res: T) {
    // add to Microtask queue

    if (this._status === "pedding") {
      this._status = "resolve";
      this._res = res;

      for (const onFulfilled of this._queueOnFulfilledCallback) {
        onFulfilled(res);
      }
      this._queueOnFulfilledCallback = [];
    }
  }
  _reject(err: E) {
    if (this._status === "pedding") {
      this._status = "reject";
      this._err = err;
      for (const onRejected of this._queueOnRejectedCallback) {
        onRejected(err);
      }
      this._queueOnRejectedCallback = [];
    }
  }
  then(onFulfilled: (res: T) => any, onRejected?: (err: E) => void) {
    const p2 = new MyPromise((resolve, reject) => {
      let _onFulfilled = (res: T) => {
        try {
          const x = onFulfilled(this._res);
          if (p2 === x) {
            return reject(
              new TypeError("Chaining cycle detected for promise #<MyPromise>")
            );
          }
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (error) {
          reject(error);
        }
      };

      let _onRejected = onRejected
        ? (err: E) => {
            try {
              const _err = onRejected(err);
              reject(_err);
            } catch (error) {
              reject(error);
            }
          }
        : undefined;

      if (this._status === "pedding") {
        this._queueOnFulfilledCallback.push(_onFulfilled);
        if (_onRejected) {
          this._queueOnRejectedCallback.push(_onRejected);
        }
      } else if (this._status === "resolve") {
        queueMicrotask(() => {
          _onFulfilled(this._res);
        });
      } else {
        _onRejected && _onRejected(this._err);
      }
    });

    return p2;
    // return this;
  }
}

MyPromise.deferred = function () {
  var result: {
    resolve?: (...args: any[]) => any;
    reject?: (...args: any[]) => any;
    promise?: MyPromise<any, any>;
  } = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports =MyPromise
