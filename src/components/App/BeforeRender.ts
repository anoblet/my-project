import Debug from "../../Debug";
import Firebase from "../../Firebase";
import State from "../../State";
import Store from "../../Store";
import Theme from "../../Theme";
import User from "../../User";
import { config } from "../../../etc/config";
import { getAppSettings } from "./Utility";
import { secret } from "../../../etc/secret";

export const beforeRender = async function() {
  Firebase.init(secret.firebase);
  // firebase.performance();
  if (config.globalSettings) {
    const settings: any = await getAppSettings(false);
    State.set({ data: { settings }, store: Store, type: "app" });
    if (!config.staticTheme) {
      const theme = Theme.convert(settings.defaultTheme);
      Theme.set(theme, this);
    }
  }
  Debug.log("Getting User level settings");
  const user: any = await Firebase.getUser();
  if (user) {
    Debug.log("User logged in");
    const userData = User.extract(user);
    State.set({ data: userData, store: Store, type: "user" });
    Debug.log("Getting User settings");
    const settings = await User.getUserSettings();
    State.set({ data: { settings }, store: Store, type: "User" });
    Debug.log("Finished getting User settings");
    Debug.log("Getting User Theme");
    const theme = await User.getUserTheme(false);
    Theme.set(theme, this);
    State.set({
      type: "app",
      data: { settings: { theme } },
      store: Store
    });
    Debug.log("Finished getting User Theme");
  } else {
    Debug.log("User not logged in");
  }
  Debug.log("Finished getting User");
  document.querySelector("#loading").removeAttribute("enabled");
};
