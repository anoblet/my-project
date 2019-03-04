import { navigate } from "./Router";
import { routes } from "./components/AppComponent/Routes";

// @ts-ignore
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

export const disable = () => {
  annyang.abort();
};

export const voice = {
  enable,
  disable
};
