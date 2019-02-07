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

export interface IRoute {
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

export const handleNavigation = ({ location, portal, routes }: any) => {
  let matchedRoute: any;
  portal = portal || globalPortal;
  routes = routes || globalRoutes;
  routes.map((route: any) => {
    const keys: any = [];
    const regex = pathToRegexp(route.path, keys);
    const match = regex.exec(location.pathname);
    if (!match) return;
    else {
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
  if (matchedRoute.src) matchedRoute.src();
  if (portal) {
    // @todo Create an event here during DOM manipulation
    while (portal.firstChild) {
      portal.removeChild(portal.firstChild);
    }

    // If action is set, let's perform th action
    if (matchedRoute.action) {
      return;
    }

    const element = document.createElement(matchedRoute.component);
    matchedRoute.keys.map((key: any) => {
      element[key.name] = matchedRoute.data[key.name];
    });
    if (element.beforeRender)
      element.beforeRender().then(() => portal.appendChild(element));
    else portal.appendChild(element);
  }
};
