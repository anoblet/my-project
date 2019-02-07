import { route } from "../../Router";
import { getReadme } from "../Readme/Readme";

export const routes = [
  <route>{
    path: "",
    component: "page-home"
  },
  {
    path: "/admin",
    component: "admin-component",
    src: () =>
      import(/* webpackChunkName: "AdminComponent" */ /* webpackPrefetch: true */ "../AdminComponent/AdminComponent")
  },
  {
    path: "/contact",
    component: "contact-component",
    src: () =>
      import(/* webpackChunkName: "PageContact" */ /* webpackPrefetch: true */ "../Contact/Contact")
  },
  {
    path: "/components/:component?",
    component: "page-components",
    src: () =>
      import(/* webpackChunkName: "PageComponents" */ /* webpackPrefetch: true */ "../PageComponents/PageComponents")
  },
  {
    path: "/post",
    component: "post-controller",
    src: () =>
      import(/* webpackChunkName: "PostController" */ /* webpackPrefetch: true */ "../Post/PostController")
  },
  {
    path: "/post/:action?",
    component: "post-controller",
    src: () =>
      import(/* webpackChunkName: "PostController" */ /* webpackPrefetch: true */ "../Post/PostController")
  },
  {
    path: "/post/:action/:id?",
    component: "post-controller",
    src: () =>
      import(/* webpackChunkName: "PostController" */ /* webpackPrefetch: true */ "../Post/PostController")
  },
  {
    path: "/user/:action?",
    component: "user-controller",
    src: () =>
      import(/* webpackChunkName: "UserController" */ /* webpackPrefetch: true */ "../User/UserController")
  },
  {
    path: "/user-settings",
    component: "settings-component",
    src: () =>
      import(/* webpackChunkName: "SettingsComponent" */ /* webpackPrefetch: true */ "../User/SettingsComponent")
  },
  {
    path: "/user-theme",
    component: "theme-component",
    src: () =>
      import(/* webpackChunkName: "ThemeComponent" */ /* webpackPrefetch: true */ "../ThemeComponent/ThemeComponent")
  },
  {
    path: "/issue",
    component: "issue-component",
    src: () =>
      import(/* webpackChunkName: "IssueComponent" */ /* webpackPrefetch: true */ "../IssueComponent/IssueComponent")
  },
  {
    path: "/readme",
    component: "readme-component",
    src: () =>
      import(/* webpackChunkName: "ReadmeComponent" */ /* webpackPrefetch: true */ "../Readme/ReadmeComponent")
  }
];
