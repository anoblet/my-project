import { navigate } from "./Router";

const annyang = require("annyang");

// Let's define a command.
const commands = {
  "home"() {
    navigate("/");
  },
  "eye exam"() {
    navigate("/components/eye-exam");
  },
  "settings"() {
    navigate("/user-settings");
  },
  "theme"() {
    navigate("/user-theme");
  }
};

annyang.addCommands(commands);

// Start listening
export const enableAnnyang = () => {
  annyang.start();
};

export const disableAnnyang = () => {
  annyang.abort();
};

export const voice = {
  enable: enableAnnyang,
  disable: disableAnnyang
};
