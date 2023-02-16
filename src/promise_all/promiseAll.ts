export function promiseAll(list: Promise<any>[]): Promise<any[]> {
  const result = new Array(list.length);

  return new Promise((resolve, reject) => {
    for (let index = 0; index < list.length; index++) {
      const p = list[index];
      p.then((res) => {
        result[index] = res;
        if (result.every(Boolean)) {
          resolve(result);
        }
      }).catch(reject);
    }
  });
}
