import pathToRegexp from "path-to-regexp";

/*
  Example:
  export const routes = [
    {
      path: "",
      component: "page-home",
      src: () => import("../PageHome/PageHome")
    },
    {
      path: "/post/:action/:id?",
      component: "post-controller",
      src: () =>
        import("../../post/PostController")
    },
  ];
*/

// Set a default route array, and portal
let globalRoutes: any = [];
let globalPortal: any;

export interface Route {
  path: string;
  component: string;
  src?: any;
}

export const setRoutes = (routes: any) => {
  globalRoutes = routes;
};

export const setPortal = (portal: any) => {
  globalPortal = portal;
};

export const navigate = (path: string) => {
  window.history.pushState({}, "", path);
  handleNavigation({ location: window.location });
};

export const handleNavigation = async ({ location, portal, routes }: any) => {
  console.log(location.pathname);
  let matchedRoute: any;
  portal = portal || globalPortal;
  routes = routes || globalRoutes;

  // Find matched route
  routes.map((route: any) => {
    const keys: any = [];
    const regex = pathToRegexp(route.path, keys);
    const match = regex.exec(location.pathname);
    if (match) {
      match.shift();
      matchedRoute = route;
      matchedRoute.keys = keys;
      const data: any = {};
      keys.map((key: any, index: number) => {
        data[key.name] = match[index];
      });
      matchedRoute.data = data;
    }
  });
  // End find matched route

  if (!matchedRoute)
    // throw new Error(`Could not find route: ${location.pathname}`);
    return;

  // Guard
  const guard = matchedRoute.guard;
  if (guard) if (!guard()) throw new Error("Guard not satisfied");
  // End guard

  // Src
  if (matchedRoute.src) await matchedRoute.src();
  // End src

  // Check if the portal exists
  if (!portal) throw new Error("Could not find portal");
  // End check if the portal exists
  const element = document.createElement(matchedRoute.component);
  // Map properties
  matchedRoute.keys.map((key: any) => {
    element[key.name] = matchedRoute.data[key.name];
  });
  // End map properties
  if (element.beforeRender) await element.beforeRender();
  // Replace children
  while (portal.firstChild) {
    portal.removeChild(portal.firstChild);
  }
  portal.appendChild(element);
  // End replace children
};
