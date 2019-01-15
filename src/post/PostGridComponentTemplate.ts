import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <card-component>
      <h3 slot="title"><a href="/post">Posts</a></h3
      <div class="grid">
        <div class="row">
          <div class="column no-grow">#</div>
          <div class="column">Title</div>
          <div class="column">Author</div>
          <div class="column no-grow no-visibility">
            <button>Delete</button>
          </div>
        </div>
        ${this.items.map(
          (item: any, index: number) => html`
            <div class="row">
              <div class="column no-grow">${index}</div>
              <div class="column">
                <a href="/post/read/${item.id}">${item.title}</a>
              </div>
              <div class="column">${item.author}</div>
              <div class="column no-grow">
                <button @click="${() => this.deleteItem(index)}">Delete</button>
              </div>
            </div>
          `
        )}
      </div>
      <div slot="actions">
        <a href="/post/create"><mwc-button outlined>New</mwc-button></a>
      </div>
    </card-component>
  `;
}
