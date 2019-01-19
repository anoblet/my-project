import { html, LitElement, property } from "lit-element";
import { store } from "../../store";
import { getCollection } from "../../../packages/firebase-helpers/firebase-helpers";
import { getDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { updateDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import globalStyle from "../../Styles";
import themeEdit from "./ThemeEdit";

const properties = [
  { label: "Background color", property: "backgroundColor" },
  { label: "Text color", property: "textColor" },
  { label: "Link color", property: "linkColor" },
  { label: "Border color", property: "borderColor" }
];

const getThemePath = () => {
  const state = store.getState();
  return `users/${state.user.uid}/settings/theme`;
};

const theme = async () => {
  return await getDocument({ path: getThemePath() });
};

export class ThemeComponent extends LitElement {
  static get styles() {
    return [globalStyle];
  }

  public render() {
    const state = store.getState();
    return html`
      <card-component>
        ${themeEdit({ fields: properties, theme: state.theme })}
      </card-component>
    `;
  }
}

window.customElements.define("theme-component", ThemeComponent);
