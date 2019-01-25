var pathToRegexp = require("path-to-regexp");

let globalRoutes: any = [];
let globalPortal: any;

export const setRoutes = (routes: any) => {
  globalRoutes = routes;
};

export const setPortal = (portal: any) => {
  globalPortal = portal
}

export const navigate = (path: string) => {
  window.history.pushState({}, "", path);
  handleNavigation({ location: window.location });
};

export const handleNavigation = ({ location, portal, routes }: any) => {
  let matchedRoute: any;
  portal = portal || globalPortal;
  routes = routes || globalRoutes;
  routes.map((route: any) => {
    let keys: any = [];
    const regex = pathToRegexp(route.path, keys);
    const match = regex.exec(location.pathname);
    if (!match) return;
    else {
      match.shift();
      matchedRoute = route;
      matchedRoute.keys = keys;
      let data: any = {};
      keys.map((key: any, index: number) => {
        data[key.name] = match[index];
      });
      matchedRoute.data = data;
    }
  });
  if (matchedRoute.src) matchedRoute.src();
  if (portal) {
    // portal.setAttribute("hidden", "");
    while (portal.firstChild) {
      portal.removeChild(portal.firstChild);
    }
    const element = document.createElement(matchedRoute.component);
    matchedRoute.keys.map((key: any) => {
      element[key.name] = matchedRoute.data[key.name];
    });
    portal.appendChild(element);
    // portal.removeAttribute("hidden");
  }
};
