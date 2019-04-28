import { firebase } from "./Firebase";
// Opinion
import { config } from "../config";

// Store as a singleton (if needed an iife)
// const performance ;

/**
 * Assume performance returns the performance object no matter the state of the app
 * @return firebase.performance
 */
export const performance = async () => {
  const _instance = await firebase.init(config.firebase);
  return _instance.performance();
};

export const trace = () => {
  // Kina weird but instance needs an instance of performance
  return;
};

const start = (label: string) => {
  return;
};
