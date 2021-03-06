import * as randomMC from "random-material-color";

import { LitElement, css, customElement, html, property } from "lit-element";
import { getCollection, getDocument, updateDocument } from "../../Firebase";

import GlobalStyle from "../../GlobalStyle";
import listThemes from "./ListThemes";
import saveThemeTemplate from "./SaveTheme";
import { store } from "../../Store";
import themeEdit from "./ThemeEdit";
import { themeStructure } from "./Structure";
import { toggleDark } from "./ToggleDark";
import { toggleShadow } from "./ToggleShadow";
import { isSignedIn } from "../../User";
import Theme from "../../Theme";

export const setTheme = (_theme: any) => {
  const state = store.getState();
  Theme.set(Theme.convert(_theme), document.querySelector("app-component"));
  return updateDocument({
    path: `users/${state.user.uid}/settings/theme`,
    data: { currentTheme: _theme }
  });
};

const randomColor = () => {
  return randomMC.getColor();
};

const randomTheme = () => {
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
    this.currentTheme = state.app.settings.theme;
    if (isSignedIn()) {
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
  }

  static get styles() {
    return [
      GlobalStyle,
      css`
        :host {
          flex: 1;
        }

        label {
          display: flex;
          align-items: center;
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
          <grid-component
            style="grid-template-columns: min-content max-content 1fr"
          >
            ${toggleDark()} (Broken) ${toggleShadow()} (Broken)
          </grid-component>
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
        <card-component title="Export" style="word-break: break-word;">
          <pre>${JSON.stringify(this.currentTheme, null, 2)}</pre>
        </card-component>
      </grid-component>
    `;
  }
}
