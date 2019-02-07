import { html } from "lit-element";

export const generateSitemap = (routes: any) => {
  const filteredRoutes: any = [];
  routes.map((route: any) => {
    filteredRoutes.push(route.path);
  });
  return html`
    <ul>
      ${filteredRoutes.map(
        (route: any) =>
          html`
            <li>${route}</li>
          `
      )}
    </ul>
  `;
};
