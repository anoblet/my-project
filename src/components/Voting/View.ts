import { LitElement, css, customElement, html, property } from "lit-element";
import Firebase from "../../Firebase";

const Template = function() {
  return html`
    <h2>${this.data.title}</h2>
    <grid-component columns="2">
      ${this.data.options.map(
        (option, index) =>
          html`
            <span class="label">${option}</span>
            <button-component
              label="Vote"
              @click=${() => this.registerVote(index)}
            ></button-component>
          `
      )}
    </grid-component>
  `;
};

const Style = css`
  .label {
    display: flex;
    align-items: center;
  }
`;

@customElement("view-poll")
export class Component extends LitElement {
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  @property() data: { title: string; options: []; results: {} };
  @property() pollId: string;

  connectedCallback() {
    super.connectedCallback();
    Firebase.getDocument({
      path: `polls/${this.pollId}`,
      callback: data => (this.data = data),
      watch: true
    });
  }

  public registerVote(index: number) {
    this.data.results = this.data.results || {};
    this.data.results[index] = this.data.results[index] || 0;
    this.data.results[index]++;
    Firebase.update({
      data: this.data,
      path: `polls/${this.pollId}`
    });
  }
}
