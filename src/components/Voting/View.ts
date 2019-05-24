import { LitElement, css, customElement, html, property } from "lit-element";
import Firebase from "../../Firebase";
import { getIp } from "../../User";

const Template = function() {
  return html`
    <h2>${this.data.title}</h2>
    <grid-component columns="2">
      ${this.data.options.map(
        (option: string, index: number) =>
          html`
            <span class="label">${option}</span>
            ${!this.didVote
              ? html`
                  <button-component
                    label="Vote"
                    @click=${() => this.registerVote(index)}
                  ></button-component>
                `
              : ""}
            ${this.data.result ? this.data.result[index] : ""}
          `
      )}
    </grid-component>
    <div>${this.didVote ? html`You have already voted`: ""}</div>
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

  @property() data;
  @property() pollId: string;
  @property() didVote: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    this.beforeRender();
    Firebase.getDocument({
      path: `polls/${this.pollId}`,
      callback: (data) => this.data = data,
      watch: true
    });
  }

  async beforeRender() {
    this.data = await Firebase.getDocument({
      path: `polls/${this.pollId}`
    });
    await this._didVote();
  }

  async _didVote() {
    const ip = await getIp();
    this.didVote = this.data.votedIps.includes(ip) ? true : false;
  }

  public async registerVote(index: number) {
    const ip = await getIp();
    if (this.data.votedIps.includes(ip)) return;
    this.data.result = this.data.result || {};
    this.data.result[index] = this.data.result[index] || 0;
    this.data.result[index]++;
    this.data.votedIps.push(ip);
    Firebase.update({
      data: this.data,
      path: `polls/${this.pollId}`
    });
  }
}
