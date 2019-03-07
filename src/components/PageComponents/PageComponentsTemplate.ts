import { html } from "lit-element";
import { isAdmin } from "../../User";

export default function() {
  return html`
    <my-grid id="content-grid">
      <card-component title="Components">
        <div slot="content">
          <ul>
            ${true // isAdmin()
              ? html`
                  <a href="/components/eye-exam"><li>Eye Exam</li></a>
                  <a href="/components/collection-list"><li>Collection list</li></a>
                  <a href="/components/color-picker"><li>Color</li></a>
                  <a href="/components/dasboard-component"><li>Dashboard component</li></a>
                `
              : ""}
          </ul>
        </div></card-component
      >
    </my-grid>
  `;
}
