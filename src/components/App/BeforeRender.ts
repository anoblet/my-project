import Firebase from "../../Firebase";
import { config } from "../../../config";
import { getAppSettings } from "./Utility";
import { state } from "../../State";
import { theme } from "../../Theme";
import { store } from "../../Store";
import { debug, log } from "../../Debug";
import { user } from "../../User";

export const beforeRender =  async function() {
  Firebase.init(config.firebase);
  // firebase.performance();
  if (config.globalSettings) {
    await getAppSettings((document: any) => {
      state.set({ data: { settings: document }, store, type: "app" });
      if (!config.staticTheme) {
        const _theme = theme.convert(document.defaultTheme);
        theme.set(_theme, this);
      }
    });
  }
  debug.log("Getting user level settings");
  const _user = await Firebase.getUser();
  if (_user) {
    log("User logged in");
    const userData = user.extract(_user);
    state.set({ data: userData, store, type: "user" });
    log("Getting user settings");
    await user.getUserSettings((document: any) => {
      state.set({ data: { settings: document }, store, type: "user" });
    });
    log("Finished getting user settings");
    log("Getting user theme");
    await user.getUserTheme((document: any) => {
      theme.set(theme.convert(document), this);
      state.set({
        type: "app",
        data: { settings: { theme: document } },
        store
      });
    });
    log("Finished getting user theme");
  } else {
    log("User not logged in");
  }
  log("Finished getting user");
  document.querySelector("#loading").removeAttribute("enabled");
}
