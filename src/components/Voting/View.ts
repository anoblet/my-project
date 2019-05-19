import { LitElement, css, customElement, html, property } from "lit-element";
import Firebase from "../../Firebase";

/**
 * Voting component
 */
@customElement("view-poll")
export class Component extends LitElement {
  public static styles = css``;

  @property() data: { title; options };
  @property() pollId: string;

  connectedCallback() {
    super.connectedCallback();
    Firebase.getDocument({
      path: `polls/${this.pollId}`,
      callback: data => (this.data = data),
      watch: true
    });
  }

  public render() {
    return html`
      <h2>${this.data.title}</h2>
      ${this.data.options.map(
        option =>
          html`
            ${option}
          `
      )}
    `;
  }
}
