export const routes = [
  {
    name: "Home",
    path: "",
    component: "page-static"
  },
  {
    name: "Home",
    path: "/",
    component: "page-static"
  },
  {
    path: "/admin",
    component: "admin-component",
    src: () =>
      import(/* webpackChunkName: "AdminComponent" */ "../AdminComponent/AdminComponent")
  },
  {
    path: "/contact",
    component: "contact-component",
    src: () =>
      import(/* webpackChunkName: "PageContact" */ "../Contact/Contact")
  },
  {
    path: "/components/:component?",
    component: "page-components",
    src: () =>
      import(/* webpackChunkName: "PageComponents" */ "../PageComponents/PageComponents")
  },
  {
    path: "/post",
    component: "post-controller",
    src: () =>
      import(/* webpackChunkName: "PostController" */ "../Post/PostController")
  },
  {
    path: "/post/:action?",
    component: "post-controller",
    src: () =>
      import(/* webpackChunkName: "PostController" */ "../Post/PostController")
  },
  {
    path: "/post/read/:id?",
    component: "post-component",
    src: () =>
      import(/* webpackChunkName: "PostComponent" */ "../PostComponent/PostComponent")
  },
  {
    path: "/post/list",
    component: "post-grid-component",
    src: () =>
      import(/* webpackChunkName: "PostGridComponent" */ "../Post/PostGridComponent")
  },
  {
    path: "/post/create",
    component: "post-component",
    src: () =>
      import(/* webpackChunkName: "PostComponent" */ "../PostComponent/PostComponent")
  },
  {
    path: "/user/:action?",
    component: "user-controller",
    src: () =>
      import(/* webpackChunkName: "UserController" */ "../User/UserController")
  },
  {
    path: "/user-settings",
    component: "settings-component",
    src: () =>
      import(/* webpackChunkName: "SettingsComponent" */ "../User/SettingsComponent")
  },
  {
    path: "/user-theme",
    component: "theme-component",
    src: () =>
      import(/* webpackChunkName: "ThemeComponent" */ "../ThemeComponent/ThemeComponent")
  },
  {
    path: "/issue",
    component: "issue-component",
    src: () =>
      import(/* webpackChunkName: "IssueComponent" */ "../IssueComponent/IssueComponent")
  },
  {
    path: "/readme",
    component: "readme-component",
    src: () =>
      import(/* webpackChunkName: "ReadmeComponent" */ "../Readme/ReadmeComponent")
  },
  {
    path: "/sitemap",
    component: "sitemap-component",
    src: () =>
      import(/* webpackChunkName: "SitemapComponent" */ "../Sitemap/Component")
  },
  {
    path: "/blog",
    component: "blog-component",
    src: () =>
      import(/* webpackChunkName: "BlogComponent" */ "../Blog/BlogComponent")
  },
  {
    path: "/timings",
    component: "log-component",
    src: () =>
      import(/* webpackChunkName: "LogComponent" */ "../LogComponent/LogComponent")
  }
];
