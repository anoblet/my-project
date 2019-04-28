import { firebase } from "./Firebase";
// Opinion
import { config } from "../config";

export const performance = async () => {
  const _instance = await firebase.init(config.firebase);
  return _instance.performance();
};

export const trace = () => {
  return;
};

const start = () => {
  return;
};
