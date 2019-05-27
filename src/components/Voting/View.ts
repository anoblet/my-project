import { LitElement, css, customElement, html, property } from "lit-element";
import Firebase from "../../Firebase";
import { getIp } from "../../User";
import { Poll } from "./Types";

const Template = function() {
  return html`
    <grid-component>
      <h2>${this.data.title}</h2>
      <grid-component id="options">
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
                : html`
                    ${this.data.result[index] || "0"}
                  `}
            `
        )}
        ${this.didVote
          ? html`
              <span>Total</span>
              <div>${this.getTotal()}</div>
            `
          : ""}
      </grid-component>
      <div>
        ${this.didVote
          ? html`
              You have already voted
            `
          : ""}
      </div>
    </grid-component>
  `;
};

const Style = css`
  :host {
    flex: 1;
  }
  .label {
    display: flex;
    align-items: center;
  }

  #options {
    grid-template-columns: auto min-content;
  }
`;

@customElement("view-poll")
export class Component extends LitElement {
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  @property() data: Poll;
  @property() pollId: string;
  @property() didVote: boolean = false;
  @property() ip: string;

  connectedCallback() {
    super.connectedCallback();
    this.beforeRender();
  }

  async beforeRender() {
    this.data = await Firebase.getDocument({
      path: `polls/${this.pollId}`
    });
    Firebase.getDocument({
      path: `polls/${this.pollId}`,
      callback: (data: Poll) => {
        this.data = data;
      },
      watch: true
    });
    this.ip = await getIp();
    this.didVote = await this._didVote();
  }

  async _didVote() {
    return this.data.votedIps.includes(this.ip) ? true : false;
  }

  public async registerVote(index: number) {
    if (await this._didVote) return;
    this.data.result[index] = this.data.result[index] || 0;
    this.data.result[index]++;
    this.data.result.total++;
    this.data.votedIps.push(this.ip);
    Firebase.update({
      data: this.data,
      path: `polls/${this.pollId}`
    });
  }

  public getTotal() {
    let count = 0;
    Object.keys(this.data.result).map(key => (count += this.data.result[key]));
    return count;
  }
}
