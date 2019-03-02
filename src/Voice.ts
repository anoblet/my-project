import { navigate } from "./Router";
import { routes } from "./components/AppComponent/Routes";

const annyang = require("annyang");
annyang.debug();

// Let's define a command.
const commands: any = {
  home: () => {
    navigate("/");
  },
  "eye exam": () => {
    navigate("/components/eye-exam");
  },
  settings: () => {
    navigate("/user-settings");
  },
  theme: () => {
    navigate("/user-theme");
  }
};

annyang.addCommands(commands);

// Start listening
export const enable = () => {
  disable();
  annyang.start();
};

export const disable = () => {
  annyang.abort();
};

export const voice = {
  enable,
  disable
};
