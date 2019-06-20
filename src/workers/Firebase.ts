import * as Comlink from "comlink";

class App {
  _counter = 9;

  constructor() {
    this._counter = 0;
  }

  get count() {
    return this._counter;
  }

  inc() {
    this._counter++;
  }
}

Comlink.expose(App);
