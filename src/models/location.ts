import { observable, action } from "mobx";

export class Location {
  @observable
  public pathname: string;

  @action
  public setPathname(pathname: string) {
    this.pathname = pathname;
  }
}
