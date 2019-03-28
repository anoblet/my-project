import { LitElement, customElement } from "lit-element";
import { request } from "./PhilipsHue";

export class Light {
  public id: any;
  public ip: any;
  public user: any;

  public status() {}

  public state() {}

  // Events
  public off() {}

  public async on() {
    const url = `http://${this.ip}/api/${this.user}/lights/${this.id}/state`;
    const body = { on: true };
    return await request(url, body);
  }
}

@customElement("light-component")
class Component extends LitElement {};
