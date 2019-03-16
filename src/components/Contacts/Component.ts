import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

import { database as db } from "../../Database";
import { user } from "../../User";

@customElement("contacts-component")
export class Contacts extends LitElement {
  @property() data = { log: [] };

  static get styles() {
    return [GlobalStyle, Style];
  }
  public render() {
    return Template.bind(this)();
  }

  constructor() {
    super();
    this.beforeRender();
  }

  async beforeRender() {
    const _user = user.get().uid;
    if (_user)
      db.getDocument({
        path: `users/${_user}/contacts/timesheet`,
        callback: (document: any) => (this.data = document),
        watch: true
      });
  }

  public in() {
    const item = {
      type: "In",
      time: new Date().getTime()
    };
    this.add(item);
  }

  public out() {
    const item = {
      type: "Out",
      time: new Date().getTime()
    };
    this.add(item);
  }

  add(data: { type: string; time: number }) {
    const _data = { log: [...this.data.log, data] };
    const _user = user.get().uid;
    if (!_user) this.data = _data;
    db.update({
      path: `users/${_user}/contacts/timesheet`,
      data: _data
    });
  }
}
