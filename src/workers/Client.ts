import * as Comlink from "comlink";

const MyClass: any = Comlink.wrap(new Worker("/js/workers/Firebase.ts"));

(async () => {
  const instance: any = await new MyClass();
  await instance.logSomething();
})();
