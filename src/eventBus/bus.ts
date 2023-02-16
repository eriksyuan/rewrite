export class EventBus {
  callbaks: Map<string, Set<(...args: any[]) => void>>;

  constructor() {
    this.callbaks = new Map();
  }

  on(key: string, cb: (...args: any[]) => void) {
    let cbs = this.callbaks.get(key);
    if (!cbs) {
      cbs = new Set();
    }
    cbs.add(cb);
  }
  emit(key:string,...args:any[]) {
    const cbs = this.callbaks.get(key)
    if(cbs){
        cbs.forEach(cb=>{
            cb(...args)
        })
    }
  }
  cancel(key:string,cb:(...args:any[])=>void){
    const cbs = this.callbaks.get(key)
    if(cbs){
        cbs.delete(cb)
    }
  }
}
