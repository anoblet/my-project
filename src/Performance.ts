import { firebase } from "./Firebase";
// Opinion
import { secret } from "../etc/secret";
import Debug from "./Debug";

/**
 * Assume performance returns the performance object no matter the state of the app
 * @return firebase.performance
 */
const _performance = async () => {
  const _instance = await firebase.init(secret.firebase);
  return _instance.performance();
};

/**
 * This is going to be a factory
 */

export const trace = async (feature: string) => {
  const _instance = await _performance();
  return _instance.trace(feature);
};

/**
 * Wrapper for Firebase performance start
 */
const start = (label: string) => {
  return;
};

/**
 * Wrapper for Firebase performance stop
 */
const stop = () => {
  return;
};

const log = Debug.log;

export const performance = {
  log
};

export default performance;
