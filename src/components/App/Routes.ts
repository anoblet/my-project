import { Route } from "../../Router";

export const routes = [
  <Route>{
    name: "Home",
    path: "/",
    component: "page-static",
    voice: "home"
  },
  <Route>{
    path: "/admin",
    component: "admin-component",
    src: () =>
      import(/* webpackChunkName: "AdminComponent" */ "../Admin/Component"),
    voice: "admin"
  },
  <Route>{
    path: "/contact",
    component: "contact-component",
    src: () =>
      import(/* webpackChunkName: "PageContact" */ "../Contact/Contact"),
    voice: "contact"
  },
  <Route>{
    path: "/components/:component?",
    component: "page-components",
    src: () =>
      import(/* webpackChunkName: "PageComponents" */ "../PageComponents/Component")
  },
  <Route>{
    path: "/post",
    component: "post-controller",
    src: () =>
      import(/* webpackChunkName: "PostController" */ "../Post/PostController")
  },
  <Route>{
    path: "/post/:action?",
    component: "post-controller",
    src: () =>
      import(/* webpackChunkName: "PostController" */ "../Post/PostController")
  },
  <Route>{
    path: "/post/read/:id?",
    component: "post-component",
    src: () =>
      import(/* webpackChunkName: "PostComponent" */ "../Post/PostComponent")
  },
  <Route>{
    path: "/post/list",
    component: "post-grid-component",
    src: () =>
      import(/* webpackChunkName: "PostGridComponent" */ "../Post/PostGridComponent"),
    voice: "posts"
  },
  <Route>{
    path: "/post/create",
    component: "post-component",
    src: () =>
      import(/* webpackChunkName: "PostComponent" */ "../Post/PostComponent")
  },
  <Route>{
    path: "/user/:action?",
    component: "user-controller",
    src: () =>
      import(/* webpackChunkName: "UserController" */ "../User/UserController")
  },
  <Route>{
    path: "/user-settings",
    component: "settings-component",
    src: () =>
      import(/* webpackChunkName: "SettingsComponent" */ "../User/SettingsComponent"),
    voice: "settings"
  },
  <Route>{
    path: "/user-theme",
    component: "theme-component",
    src: () =>
      import(/* webpackChunkName: "ThemeComponent" */ "../Theme/ThemeComponent")
  },
  <Route>{
    path: "/issue",
    component: "issue-component",
    src: () =>
      import(/* webpackChunkName: "IssueComponent" */ "../Issue/Component")
  },
  <Route>{
    path: "/readme",
    component: "readme-component",
    src: () =>
      import(/* webpackChunkName: "ReadmeComponent" */ "../Readme/ReadmeComponent")
  },
  <Route>{
    path: "/sitemap",
    component: "sitemap-component",
    src: () =>
      import(/* webpackChunkName: "SitemapComponent" */ "../Sitemap/Component")
  },
  <Route>{
    path: "/blog",
    component: "blog-component",
    src: () =>
      import(/* webpackChunkName: "BlogComponent" */ "../Blog/Component")
  },
  {
    path: "/performance",
    component: "log-component",
    src: () =>
      import(/* webpackChunkName: "LogComponent" */ "../Log/LogComponent")
  }
];
