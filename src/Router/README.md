Example:

```export const routes = [
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
```
