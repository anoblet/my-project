import { html, fixture, expect } from "@open-wc/testing";

import "../AppFooter";

describe("<app-footer>", () => {
  it("The footer loads", async () => {
    const el = await fixture("<app-footer></app-footer>");
    expect(!!el).to.equal(true);
  });
});
