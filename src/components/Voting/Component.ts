import { LitElement, customElement, property } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";
import { Dialog } from "../Dialog/Component";
import Firebase from "../../Firebase";
import GlobalStyle from "../../GlobalStyle";
import { Poll } from "./Types";
import Style from "./Style";
import Template from "./Template";

/**
 * Voting UI Component
 *
 * @todo this should just be a ui component
 */
@customElement("voting-component")
export class Component extends BeforeRender(LitElement) {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  @property({ type: Array }) public polls = [];

  async beforeRender() {
    // Satisfies polls on initial view
    this.polls = await Firebase.getCollection({
      path: "/polls"
    });
    // Syncs polls on subsequent changes
    await this.getPolls();
  }

  public showCreateDialog() {
    const dialog: Dialog = this.shadowRoot.querySelector("#create-dialog");
    dialog.open();
  }

  public async getPolls() {
    return Firebase.getCollection({
      path: "/polls",
      callback: (polls: Poll[]) => {
        this.polls = polls;
      },
      watch: true
    });
  }

  public async deletePoll(index: number) {
    const poll = this.polls[index];
    Firebase.deleteDocument({ path: `/polls/${poll.id}` });
  }
}
