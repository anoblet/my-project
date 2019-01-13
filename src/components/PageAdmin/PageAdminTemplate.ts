import { html } from "lit-element";

export default function({ user }: any) {
  return html`
    <ul>
      <a href="/post"><li>Posts</li></a>
    </ul>
  `;
}
