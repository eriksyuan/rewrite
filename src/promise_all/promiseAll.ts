export function promiseAll(list: Promise<any>[]): Promise<any[]> {
  const result = new Array(list.length).fill(null);

  return new Promise((resolve, reject) => {
    for (let index = 0; index < list.length; index++) {
      const p = list[index];
      p.then((res) => {
        result[index] = res;
        if (result.every((l) => l !== null)) {
          resolve(result);
        }
      }).catch(reject);
    }
  });
}
