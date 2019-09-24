import { observable, action } from "mobx";

export class URL {
  @observable
  public path = "/";

  @action
  public setPath(path: string) {
    this.path = path;
  }
}
