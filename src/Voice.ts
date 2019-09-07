import { navigate } from "@anoblet/router";
import { routes } from "./components/App/Routes";

import annyang from "annyang";

annyang.debug();

const commands: any = {};
routes.map((route: any) => {
  if (route.voice) commands[route.voice] = () => navigate(route.path);
});

annyang.addCommands(commands);

// Start listening
export const enable = () => {
  annyang.start();
};

// This does not work on current versions of Chrome
export const disable = () => {
  annyang.abort();
  annyang.getSpeechRecognizer().stop();
};

export const voice = {
  enable,
  disable
};

export default voice;
