import { LitElement, css, customElement, html, property } from "lit-element";

export const view = () =>
  html`
    Hi
  `;

/**
 * Voting component
 */
@customElement("view-poll")
export class Component extends LitElement {
  public static styles = css``;

  @property() pollId: string;

  public render() {
    return html`Hi`;
  }
}
