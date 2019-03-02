import {
  getDocument,
  updateDocument
} from "../../../packages/firebase-helpers";

import { LitElement } from "lit-element";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import { store } from "../../Store";
import { toast } from "../Toast/Toast";

const properties = {
  breadcrumbs: {
    type: Boolean,
    description: "Breadcrumbs",
    label: "Breadcrumbs"
  }
};

export interface SettingsComponent {
  [key: string]: any; // Add index signature
}

export class SettingsComponent extends LitElement {
  public values: any;

  constructor() {
    super();
    this.beforeRenderComplete = false;
    this.beforeRender().then(() => (this.beforeRenderComplete = true));
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
