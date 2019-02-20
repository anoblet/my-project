import { html } from "lit-element";

export const generateSitemap = (routes: any) => {
  routes.shift();
  const filteredRoutes: any = [];
  routes.map((route: any) => {
    if (!route.path.includes("?")) filteredRoutes.push(route.path);
  });
  return html`
    <ul>
      ${filteredRoutes.map(
        (route: any) =>
          html`
            <li><a href="${route}">${route}</a></li>
          `
      )}
    </ul>
  `;
};
