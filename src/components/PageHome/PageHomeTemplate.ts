import { html } from "lit-element";
import("../../../packages/PellComponent/PellComponent");
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
                    <a href="/theme">theme</a> or create a
                    <a href="/user/post">private post</a>.
                  `
                : html`
                    <ul>
                      <li>Please <a href="/user">sign in</a>.</li>
                    </ul>
                  `
            }
            Shift + space or long tap will give you a radial menu. This can be
            turned off in user/settings.
          </p>
        </div>
      </my-card>
      <blog-component> </blog-component>
    </my-grid>
  `;
}
