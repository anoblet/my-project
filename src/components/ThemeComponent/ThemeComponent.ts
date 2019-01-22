import { html, LitElement, property } from "lit-element";
import { until } from "lit-html/directives/until";
import { store } from "../../store";
import { addDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { getCollection } from "../../../packages/firebase-helpers/firebase-helpers";
import { getDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { updateDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { setState } from "../../../packages/state-helpers/state-helpers";
import GlobalStyle from "../../GlobalStyle";
import themeEdit from "./ThemeEdit";
import listThemes from "./ListThemes";
import saveThemeTemplate from "./SaveTheme";

export const themeStructure = [
  {
    label: "Background color",
    property: "backgroundColor",
    varName: "--background-color"
  },
  { label: "Text color", property: "textColor", varName: "--text-color" },
  { label: "Link color", property: "linkColor", varName: "--link-color" },
  { label: "Border color", property: "borderColor", varName: "--border-color" },
  {
    label: "Primary color",
    property: "primaryColor",
    varName: "--primary-color"
  },
  {
    label: "Secondary color",
    property: "secondaryColor",
    varName: "--secondary-color"
  }
];

const getThemePath = () => {
  const state = store.getState();
  return `users/${state.user.uid}/settings/theme`;
};

const theme = async () => {
  return await getDocument({ path: getThemePath() });
};

export const setTheme = (theme: any) => {
  const state = store.getState();
  // setState({ data: theme, store: store, type: "theme" });
  updateDocument({
    path: `users/${state.user.uid}/settings/theme`,
    data: { currentTheme: theme }
  });
};

export class ThemeComponent extends LitElement {
  @property({ type: Array }) savedThemes: any;

  firstUpdated() {
    const state = store.getState();
    getCollection({
      callback: (themes: any) => {
        this.savedThemes = themes;
      },
      path: `/users/${state.user.uid}/settings/theme/savedThemes`,
      watch: true
    });
  }

  static get styles() {
    return [GlobalStyle];
  }

  public render() {
    const state = store.getState();
    return html`
      <grid-component>
        <card-component title="Current theme">
          ${themeEdit({ fields: themeStructure, theme: state.theme })}
        </card-component>
        <card-component> ${saveThemeTemplate.bind(this)()} </card-component>
        ${
          this.savedThemes
            ? html`
                <card-component title="Saved themes">
                  <div slot="content">
                    <ul>
                      ${listThemes.bind(this)()}
                    </ul>
                  </div>
                </card-component>
              `
            : ""
        }
      </grid-component>
    `;
  }
}

window.customElements.define("theme-component", ThemeComponent);
