import { html, fixture, expect } from "@open-wc/testing";

import "../Drawer";

describe("<drawer-component>", () => {
  it("media size is determined, what to do next?", async () => {
    const el = await fixture("<drawer-component></drawer-component>");
    expect(!!el.mediaSize).to.equal(false);
  });

  it("drawer is displayed by default on large screens", async () => {
    const el = await fixture("<drawer-component></drawer-component>");
    expect(el.header).to.equal("My Example");
  });

  it("drawer is closed on small screens", async () => {
    const el = await fixture("<drawer-component></drawer-component>");
    expect(el.header).to.equal("My Example");
  });
});
