import { firebase } from "./Firebase";
// Opinion
import { config } from "../config";

export const performance = () => {
  return;
};

export const trace = () => {
  return;
};

const start = () => {
  const _firebase = firebase.init(config.firebase);
};
