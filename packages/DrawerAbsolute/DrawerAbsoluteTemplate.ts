import { html } from '@polymer/lit-element';
export default function({ theme, user }: any) {
  return html`
  <my-card collapsible grow full-height>
    <h3 slot="title">Menu</h3>
    <div slot="content">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/user">User</a>
        </li>
        <li>
          <a href="/theme">Theme</a>
        </li>
        <li>
          <a href="/info">Info</a>
        </li>
      </ul>
    </div>
  </my-card>
  `;
}
