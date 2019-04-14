import "./components/App/Component";
import "./components/Header/Component";
import "./components/Footer/Component";
import "./components/PageStatic";
import "./components/Drawer/Component";
import "./components/ProfileMenu/ProfileMenu";
import "./components/Card/Component";
import "./components/Grid/Component";
import "./components/Loading/Component";
import "./components/ContextMenu/MenuComponent";
import "./components/Breadcrumb/Component";
import "./components/VoiceComponent";
import "./components/Button/Component";
// Firebase
import "@firebase/app";
import "@firebase/auth";
// Google analytics
import galite from "ga-lite";
galite("create", "UA-63899225-2", "auto");
galite("send", "pageview");
