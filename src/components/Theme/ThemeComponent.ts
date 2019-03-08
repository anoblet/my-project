import { LitElement, css, customElement, html, property } from "lit-element";
import { getCollection, getDocument, updateDocument } from "../../Firebase";

import GlobalStyle from "../../GlobalStyle";
import listThemes from "./ListThemes";
import saveThemeTemplate from "./SaveTheme";
import { store } from "../../Store";
import themeEdit from "./ThemeEdit";
import { themeStructure } from "./ThemeStructure";
import { toggleDark } from "./ToggleDark";
import { toggleShadow } from "./ToggleShadow";

// @ts-ignore
const randomMC = require("random-material-color");

const getThemePath = () => {
  const state = store.getState();
  return `users/${state.user.uid}/settings/theme`;
};

const theme = async () => {
  return await getDocument({ path: getThemePath() });
};

export const setTheme = (_theme: any) => {
  const state = store.getState();
  return updateDocument({
    path: `users/${state.user.uid}/settings/theme`,
    data: { currentTheme: _theme }
  });
};

const randomColor = () => {
  return randomMC.getColor();
};

const randomTheme = () => {
  const state = store.getState();
  const _theme: any = {};
  themeStructure.map((field: any) => {
    if (field.type === "color") _theme[field.property] = randomColor();
  });
  setTheme(_theme);
};

@customElement("theme-component")
export class ThemeComponent extends LitElement {
  @property({ type: Array }) public currentTheme: any = {};
  @property({ type: Array }) public savedThemes: any;

  public firstUpdated() {
    const state = store.getState();
    getDocument({
      callback: (_theme: any) => {
        this.currentTheme = _theme.currentTheme;
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
    return [
      GlobalStyle,
      css`
        :host {
          flex: 1;
        }
      `
    ];
  }

  public render() {
    return html`
      <grid-component>
        <card-component title="Random theme">
          <button-component
            label="Random theme"
            outlined
            @click="${randomTheme}"
          ></button-component>
        </card-component>
        <card-component title="Toggles">
          ${toggleDark()} ${toggleShadow()}
        </card-component>
        <card-component title="Current theme">
          ${themeEdit({ fields: themeStructure, theme: this.currentTheme })}
        </card-component>
        <card-component> ${saveThemeTemplate.bind(this)()} </card-component>
        ${this.savedThemes
          ? html`
              <card-component title="Saved themes">
                <div slot="content">
                  <ul>
                    ${listThemes(this.savedThemes)}
                  </ul>
                </div>
              </card-component>
            `
          : ""}
      </grid-component>
    `;
  }
}
