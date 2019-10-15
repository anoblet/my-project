import { Route } from "@anoblet/router";

export const routes = [
  {
    name: "Home",
    path: "/",
    component: "page-home",
    voice: "home"
  } as Route,
  {
    path: "/admin",
    component: "admin-component",
    src: () =>
      import(
        /* webpackChunkName: "AdminComponent" */ "./components/Admin/Component"
      ),
    voice: "admin"
  } as Route,
  {
    path: "/contact",
    component: "contact-component",
    src: () =>
      import(
        /* webpackChunkName: "PageContact" */ "./components/Contact/Component"
      ),
    voice: "contact"
  } as Route,
  {
    path: "/components/:component?",
    component: "page-components",
    src: () =>
      import(
        /* webpackChunkName: "PageComponents" */ "./components/PageComponents/Component"
      )
  } as Route,
  {
    path: "/post/read/:id?",
    component: "post-component",
    src: () =>
      import(
        /* webpackChunkName: "PostComponent" */ "./components/Post/PostComponent"
      )
  } as Route,
  {
    path: "/post/list",
    component: "post-grid-component",
    src: () =>
      import(
        /* webpackChunkName: "PostGridComponent" */ "./components/Post/PostGridComponent"
      ),
    voice: "posts"
  } as Route,
  {
    path: "/post/create",
    component: "post-component",
    src: () =>
      import(
        /* webpackChunkName: "PostComponent" */ "./components/Post/PostComponent"
      )
  } as Route,
  {
    path: "/user/:action?",
    component: "user-controller",
    src: () =>
      import(
        /* webpackChunkName: "UserController" */ "./components/User/UserController"
      )
  } as Route,
  {
    path: "/user-settings",
    component: "settings-component",
    src: () =>
      import(
        /* webpackChunkName: "SettingsComponent" */ "./components/User/SettingsComponent"
      ),
    voice: "settings"
  } as Route,
  {
    path: "/user-theme",
    component: "theme-component",
    src: () =>
      import(
        /* webpackChunkName: "ThemeComponent" */ "./components/Theme/ThemeComponent"
      )
  } as Route,
  {
    path: "/issue",
    component: "issue-component",
    src: () =>
      import(
        /* webpackChunkName: "IssueComponent" */ "./components/Issue/Component"
      )
  } as Route,
  {
    path: "/readme",
    component: "readme-component",
    src: () =>
      import(
        /* webpackChunkName: "ReadmeComponent" */ "./components/Readme/Component"
      )
  } as Route,
  {
    path: "/sitemap",
    component: "sitemap-component",
    src: () =>
      import(
        /* webpackChunkName: "SitemapComponent" */ "./components/Sitemap/Component"
      )
  } as Route,
  {
    path: "/blog",
    component: "blog-component",
    src: () =>
      import(
        /* webpackChunkName: "BlogComponent" */ "./components/Blog/Component"
      )
  } as Route,
  {
    path: "/performance",
    component: "log-component",
    src: () =>
      import(
        /* webpackChunkName: "LogComponent" */ "./components/Log/LogComponent"
      )
  },
  {
    path: "/components/demo-component",
    component: "demo-component",
    src: () =>
      import(/* webpackChunkName: "ChartJS" */ "./components/ChartJS/Demo")
  },
  {
    path: "/poll/:pollId?",
    component: "poll-view",
    src: () =>
      import(/* webpackChunkName: "PollView" */ "./components/Voting/View")
  } as Route,
  {
    path: "/tutor",
    component: "page-tutor",
    src: () =>
      import(/* webpackChunkName: "PageTutor" */ "./pages/tutor/component")
  } as Route
];
