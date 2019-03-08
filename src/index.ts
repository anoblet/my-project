import "./components/App/AppComponent";
import "./components/AppHeader/AppHeader";
import "./components/AppFooter/AppFooter";
import "./components/PageStatic";
import "./components/Drawer/DrawerComponent";
import "./components/ProfileMenu/ProfileMenu";
import "./components/Card/CardComponent";
import "./components/Grid/GridComponent";
import "./components/Loading/LoadingComponent";
import "./components/MenuComponent/MenuComponent";
import "./components/Breadcrumb/BreadcrumbComponent";
import "./components/VoiceComponent";
// Firebase
import "firebase/app";
import "firebase/auth";
// @ts-ignore
import galite from "ga-lite";
galite("create", "UA-63899225-2", "auto");
galite("send", "pageview");
