import pathToRegexp from "path-to-regexp";

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
  console.log(path);
  routeChanged({ location: window.location });
};

/**
 * Route changed
 * @param  location
 * @param  portal    Outlet to serve results
 * @param  routes}   Our route definition file to parse
 * @return
 */

export const routeChanged = async ({ location, portal, routes }: any) => {
  let matchedRoute: any;
  portal = portal || globalPortal;
  routes = routes || globalRoutes;

  // Find a matched route
  routes.map((route: Route) => {
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

  if (!matchedRoute) {
    console.log(`Could not find route: ${location.pathname}`);
    // throw new Error(`Could not find route: ${location.pathname}`);
    return;
  }

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
  const loading = document.createElement("loading-component");
  // Remove children
  while (portal.firstChild) {
    portal.removeChild(portal.firstChild);
  }
  portal.appendChild(loading);
  if (element.beforeRender) await element.beforeRender();
  portal.removeChild(loading);
  portal.appendChild(element);
  // End replace children
};

export const handleNavigation = routeChanged;

export const router = {
  routeChanged,
  setPortal,
  setRoutes
};
