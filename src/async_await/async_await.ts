export function asyncAwait(g: (...args: any[]) => Generator<Promise<any>|any>) {
  return function (...args: any[]) {
    const gen = g.call(this, ...args) as Generator<Promise<any>>;
    return new Promise((resolve, reject) => {
      let res: IteratorResult<Promise<any>, any>;
      function next(arg?: any) {
        try {
          res = gen.next(arg);
        } catch (error) {
          reject(error);
        }
        const { done, value } = res;
        if (done) {
          resolve(value);
        } else {
          Promise.resolve(value)
            .then((res) => {
              next(res);
            })
            .catch((err) => {
              reject(err);
            });
        }
      }
      next();
    });
  };
}
