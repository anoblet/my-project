import { html, fixture, expect } from "@open-wc/testing";

import "../Drawer";

describe("<drawer-component>", () => {
  it("media size is determined, what to do next?", async () => {
    const el = await fixture("<drawer-component></drawer-component>");
    expect(!!el.mediaSize).to.equal(true);
  });

  // it("drawer is closed on mobile screens", async () => {
  //   const el = await fixture(
  //     "<drawer-component media-size='mobile'></drawer-component>"
  //   );
  //   expect(el.hidden).to.equal(true);
  // });

  it("drawer is displayed by default on desktop screens", async () => {
    const el = await fixture(
      "<drawer-component media-size='desktop'></drawer-component>"
    );
    expect(el.hidden).to.equal(false);
  });
});
