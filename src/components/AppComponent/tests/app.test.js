import { html, fixture, expect } from "@open-wc/testing";

import "../AppComponent";

describe("<app-component>", () => {
  it("The application shell loads", async () => {
    const el = await fixture("<app-component></app-component>");
    expect(!!el).to.equal(true);
  });
});
