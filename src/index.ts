import { config } from "../config";
import "./components/App/Component";
import "./components/Header/Component";
import "./components/Footer/Component";
import "./components/PageStatic";
import "./components/ProfileMenu/ProfileMenu";
import "./components/Card/Component";
import "./components/Loading/Component";
import "./components/Breadcrumb/Component";
import "./components/Voice/Component";

import "@anoblet/button-component";
import "@anoblet/drawer-component";

// Firebase
import "@firebase/app";
import "@firebase/auth";

// Google analytics
if (config.analytics) {
  import("ga-lite").then((module: any) => {
    const galite = module.default;
    galite("create", "UA-63899225-2", "auto");
    galite("send", "pageview");
  });
}

// Voice
import("./Voice");
