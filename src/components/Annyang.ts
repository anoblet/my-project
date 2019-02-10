import { navigate } from "../Router";

const annyang = require("annyang");

// Let's define a command.
var commands = {
  hello: function() {
    alert("Hello world!");
  },
  "eye exam": function() {
    navigate("/components/eye-exam");
  },
  settings: function() {
    navigate("/user-settings");
  },
  theme: function() {
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
