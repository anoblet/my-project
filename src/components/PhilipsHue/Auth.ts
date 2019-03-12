import { LitElement, customElement, html, property } from "lit-element";
import { BeforeRender } from "../../mixins/BeforeRender";

@customElement("philips-hue-auth")
export class Auth extends BeforeRender(LitElement) {
  @property() id: any;
  @property() ip: any;
  @property() state: any;
  // 0 = No interraction,
  // 1 = User pressed connect, and needs to press physical button,
  // 2 = User pressed physical button and we need a username

  async beforeRender() {
    return;
  }

  render() {
    return html`
      ${!this.status()
        ? html`
            <button @click=${this.auth}>Auth</button>
          `
        : ""}
    `;
  }

  async auth() {
    const devicetype = "anoblet";
    return await fetch(`http://${this.ip}/api`, {
      body: JSON.stringify({ devicetype }),
      method: "POST"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        const body = json[0];
        if (body.error)
          if (body.error.type === 101) {
            console.log("Press button");
          }
      });
  }

  status() {
    const user = localStorage.getItem("user");
    console.log(user ? true : false);
    return user ? true : false;
  }
}
