import { LitElement, customElement, property, query } from "lit-element";

import Firebase from "../../Firebase";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";

import { Poll } from "./Types";
import { Dialog } from "../Dialog/Component";

/**
 * Voting UI Component
 *
 * @todo this should just be a ui component
 */
@customElement("voting-component")
export class Component extends LitElement {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  @property({ type: Array }) public polls = [];

  @query("#create-dialog") public dialog: Dialog;

  public constructor() {
    super();
    this.getPolls();
  }

  public showCreateDialog() {
    this.dialog.open();
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
