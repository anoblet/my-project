import "@anoblet/grid-component";
import "@anoblet/card-component";

import { html } from "lit-element";

export default function() {
  return html`
    <grid-component
      ><card-component title="Hi!"
        ><h1 slot="title">Tutoring</h1>
        <div slot="body">
          <h3>I offer one on one tutoring that is tailored to your needs.</h3>
          <ul>
            <li>Topics</li>
            <ul>
              <li>Word</li>
              <li>Excel</li>
              <li>Powerpoint</li>
              <li>Email</li>
              <li>Web browsing</li>
            </ul>
            <li>
              Qualities
            </li>
            <ul>
              <li>Patient</li>
              <li>Caring</li>
              <li>Individualized</li>
            </ul>
          </ul>
        </div></card-component
      ></grid-component
    >
  `;
}
