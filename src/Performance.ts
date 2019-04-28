import { firebase } from "./Firebase";
// Opinion
import { config } from "../config";
/**
 * Assume performance returns the performance object no matter the state of the app
 * @return firebase.performance
 */
export const performance = async () => {
  const _instance = await firebase.init(config.firebase);
  return _instance.performance();
};

/**
 * This is going to be a factory
 */

export const trace = async (feature: string) => {
  const _instance = await performance();
  return _instance.trace(feature);
};

/**
 * Wrapper for Firebase performance start
 */
const start = (label: string) => {
  return;
};

/**
 * Wrapper for Firebase performance start
 */
const stop = () => {
  return;
};
