import { LitElement, customElement, property } from "lit-element";

import { BeforeRender } from "@anoblet/mixins";
import Database from "../../Database";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { user } from "../../User";

@customElement("contacts-component")
export class Contacts extends BeforeRender(LitElement) {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  @property() public data = { log: [] };

  public async beforeRender() {
    const _user = user.get().uid;
    if (_user)
      Database.getDocument({
        path: `users/${_user}/contacts/timesheet`,
        callback: (document: any) => (this.data = document),
        watch: true
      });
  }

  public in() {
    this.add({
      type: "In",
      time: new Date().getTime()
    });
  }

  public out() {
    this.add({
      type: "Out",
      time: new Date().getTime()
    });
  }

  public add(data: { type: string; time: number }) {
    const _data = { log: [...this.data.log, data] };
    const _user = user.get().uid;
    if (_user)
      Database.update({
        path: `users/${_user}/contacts/timesheet`,
        data: _data
      });
    else this.data = _data;
  }

  public deleteItem(index: number) {
    const data = this.data.log;
    data.splice(index, 1);
    const _user = user.get().uid;
    if (_user)
      Database.update({
        path: `users/${_user}/contacts/timesheet`,
        data: { log: data }
      });
    else this.data = { log: data };
  }
}
