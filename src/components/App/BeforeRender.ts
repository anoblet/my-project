import Firebase from "../../Firebase";
import { config } from "../../../config";
import { getAppSettings } from "./Utility";
import State from "../../State";
import Theme from "../../Theme";
import { store } from "../../Store";
import Debug from "../../Debug";
import User from "../../User";

export const beforeRender = async function() {
  Firebase.init(config.firebase);
  // firebase.performance();
  if (config.globalSettings) {
    await getAppSettings((document: any) => {
      State.set({ data: { settings: document }, store, type: "app" });
      if (!config.staticTheme) {
        const theme = Theme.convert(document.defaultTheme);
        Theme.set(theme, this);
      }
    });
  }
  Debug.log("Getting User level settings");
  const user = await Firebase.getUser();
  console.log(user);
  if (user) {
    Debug.log("User logged in");
    const UserData = User.extract(user);
    State.set({ data: UserData, store, type: "User" });
    Debug.log("Getting User settings");
    await User.getUserSettings((document: any) => {
      State.set({ data: { settings: document }, store, type: "User" });
    });
    Debug.log("Finished getting User settings");
    Debug.log("Getting User Theme");
    console.log(1);
    const theme = User.getTheme();
    await User.getUserTheme((document: any) => {
      Theme.set(Theme.convert(document), this);
      State.set({
        type: "app",
        data: { settings: { Theme: document } },
        store
      });
    });
    Debug.log("Finished getting User Theme");
  } else {
    Debug.log("User not logged in");
  }
  Debug.log("Finished getting User");
  document.querySelector("#loading").removeAttribute("enabled");
};
