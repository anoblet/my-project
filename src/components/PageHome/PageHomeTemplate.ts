import { html } from "@polymer/lit-element";

export default function({ user }: any) {
  return html`
    <my-grid id="content-grid">
      <my-card collapsible>
        <h3 slot="title">Welcome</h3>
        <div slot="content">
          <p>
            ${
              user.signedIn
                ? html`
                    Welcome ${user.name}. You can change your
                    <a href="/theme">theme</a> or edit a
                    <a href="/post">public post</a>.
                  `
                : html`
                    Please <a href="/user">sign in</a>.
                  `
            }
            Shift + space will give you a radial menu.
          </p>
        </div>
      </my-card>
      <my-card collapsible>
        <h3 slot="title">Lorem Ipsum</h3>
        <div slot="content"><lorem-ipsum count="100"></lorem-ipsum></div>
      </my-card>
    </my-grid>
    <my-dialog>Test</my-dialog>
  `;
}
