import { html } from "@polymer/lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <div class="grid">
      <div class="row">
        <div class="column no-grow">#</div>
        <div class="column">Title</div>
        <div class="column">Author</div>
        <div class="column">&nbsp</div>
      </div>
      ${
        this.items.map(
          (item: any, index: number) => html`
            <div class="row">
              <div class="column no-grow">${index}</div>
              <div class="column">
                <a href="/post/read/${item.id}">${item.title}</a>
              </div>
              <div class="column">${item.author}</div>
              <div class="column">
                <button @click="${() => this.deleteItem(index)}">Delete</button>
              </div>
            </div>
          `
        )
      }
    </div>
  `;
}
