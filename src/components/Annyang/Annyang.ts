import { navigate } from "../../Router";

const annyang = require("annyang");

// Let's define a command.
var commands = {
  hello: function() {
    alert("Hello world!");
  },
  "eye exam": function() {
    navigate("/componenets/eye-exam");
  }
};

// Add our commands to annyang
annyang.addCommands(commands);

// Start listening.
annyang.start();
