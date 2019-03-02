// import(/* webpackChunkName: "App" */ /* webpackPreload: true */ "./components/AppComponent/AppComponent");
import "./components/AppComponent/AppComponent";
import "./components/AppHeader/AppHeader";
import "./components/AppFooter/AppFooter";
import "./components/PageStatic";
import "./components/DrawerComponent/Drawer";
import "./components/ProfileMenu/ProfileMenu";
import "./components/MenuComponent/MenuComponent";
import "./components/CardComponent/CardComponent";
import "./components/GridComponent/GridComponent";
import "./components/BreadcrumbComponent/Breadcrumb";
// import(/* webpackChunkName: "Firebase" */ /* webpackPreload: true */ "firebase/app");
import "firebase/app";
import "firebase/auth";

const galite = require("ga-lite");

galite("create", "UA-63899225-2", "auto");
galite("send", "pageview");
