import "./components/AppComponent/AppComponent";
import "./components/AppHeader/AppHeader";
import "./components/AppFooter/AppFooter";
import "./components/PageStatic";
import "./components/DrawerComponent/Drawer";
import "./components/ProfileMenu/ProfileMenu";
import "./components/MenuComponent/MenuComponent";
import "./components/CardComponent/CardComponent";
import "./components/GridComponent/GridComponent";
import "./components/Breadcrumb/BreadcrumbComponent";
import "./components/VoiceComponent";
import "firebase/app";
import "firebase/auth";

// @ts-ignore
import galite from "ga-lite";
galite("create", "UA-63899225-2", "auto");
galite("send", "pageview");
