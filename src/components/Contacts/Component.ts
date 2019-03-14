import { LitElement, customElement, property } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

import { firebase } from "../../Firebase";
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
    firebase.getDocument({
      path: `users/${_user}/contacts/timesheet`,
      callback: document => (this.data = document),
      watch: true
    });
  }

  public in() {
    const item = {
      type: "in",
      time: new Date().getTime()
    };
    this.add(item);
  }

  public out() {
    const item = {
      type: "out",
      time: new Date().getTime()
    };
    this.add(item);
  }

  add(data) {
    this.data.log.push(data);
    const _user = user.get().uid;
    firebase.update({
      path: `users/${_user}/contacts/timesheet`,
      data: this.data
    });
  }
}
