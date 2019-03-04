import { getDocument, updateDocument } from "../../Firebase";

import { LitElement, css } from "lit-element";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import { store } from "../../Store";
import { toast } from "../Toast/Toast";
import { BeforeRender } from "../../mixins/BeforeRender";

const properties = {
  username: {
    description: "username",
    label: "Username",
    type: String
  },
  breadcrumbs: {
    type: Boolean,
    description: "Breadcrumbs",
    label: "Breadcrumbs"
  },
  voice: {
    type: Boolean,
    description: "Voice",
    label: "Voice"
  },
  rightClick: {
    description: "Enable the right-click of the mouse to toggle the main menu",
    label: "Right click",
    type: Boolean
  }
};

export interface SettingsComponent {
  [key: string]: any; // Add index signature
}

export class SettingsComponent extends BeforeRender(LitElement) {
  public values: any = {};

  static get styles() {
    return [
      css`
        :host {
          flex: 1;
        }

        grid-component {
          flex: 1;
        }

        .field {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .field input {
          margin: 0 auto;
        }
      `
    ];
  }

  public async beforeRender() {
    const state = store.getState();
    await getDocument({
      path: `users/${state.user.uid}/settings/default`
    }).then((document: any) => {
      this.values = document;
    });
  }

  public render() {
    const state = store.getState();
    return renderForm(
      this.values,
      properties,
      (_property: string, value: any) => {
        updateDocument({
          path: `users/${state.user.uid}/settings/default`,
          data: { [_property]: value }
        })
          .then(() => toast("Settings updated"))
          .catch(() => toast("Error: Settings not updated"));
      }
    );
  }
}

window.customElements.define("settings-component", SettingsComponent);
