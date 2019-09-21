import { observable, action } from "mobx";

export class Theme {
  @observable
  public textColor = "#000000";

  @action
  public setTextColor(color: string) {
    this.textColor = color;
  }
}
