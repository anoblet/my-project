import { html, LitElement, property } from "lit-element";
import { store } from "../../Store";
import { addDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { getCollection } from "../../../packages/firebase-helpers/firebase-helpers";
import { getDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { updateDocument } from "../../../packages/firebase-helpers/firebase-helpers";
import { setState } from "../../../packages/state-helpers/state-helpers";
import GlobalStyle from "../../GlobalStyle";
import themeEdit from "./ThemeEdit";
import listThemes from "./ListThemes";
import saveThemeTemplate from "./SaveTheme";
import { themeStructure } from "./ThemeStructure";

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

const randomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const randomTheme = () => {
  const state = store.getState();
  let theme: any = {};
  themeStructure.map((field: any) => {
    theme[field.property] = randomColor();
  });
  setTheme(theme);
};

export class ThemeComponent extends LitElement {
  @property({ type: Array }) currentTheme: any = {};
  @property({ type: Array }) savedThemes: any;

  firstUpdated() {
    const state = store.getState();
    getDocument({
      callback: (theme: any) => {
        this.currentTheme = theme.currentTheme;
      },
      path: `/users/${state.user.uid}/settings/theme`,
      watch: true
    });
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
    return html`
      <grid-component>
      <card-component title="Random theme">
        <mwc-button
          label="Random theme"
          outlined
          @click="${randomTheme}"
        ></mwc-button>
      </card-component>
        <card-component title="Current theme">
          ${themeEdit({ fields: themeStructure, theme: this.currentTheme })}
        </card-component>
        <card-component> ${saveThemeTemplate.bind(this)()} </card-component>
        ${
          this.savedThemes
            ? html`
                <card-component title="Saved themes">
                  <div slot="content">
                    <ul>
                      ${listThemes(this.savedThemes)}
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
