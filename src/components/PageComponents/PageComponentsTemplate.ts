import { html } from "lit-element";
import { isAdmin } from "../../User";

export default function() {
  return html`
    <my-grid id="content-grid">
      <card-component title="Components">
        <div slot="content">
          <ul>
            <!-- <a href="/components/eye-chart"><li>Eye Chart</li></a> -->
            ${true // isAdmin()
              ? html`
                  <a href="/components/eye-exam"><li>Eye Exam</li></a>
                  <a href="/components/collection-list"><li>Collection list</li></a>
                  <a href="/components/color-picker"><li>Color</li></a>
                `
              : ""}
            <!-- <a href="/components/web-speech"> <li>Web Speech API</li></a> -->
          </ul>
        </div></card-component
      >
    </my-grid>
  `;
}
