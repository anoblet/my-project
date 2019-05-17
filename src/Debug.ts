import { store } from "./Store";

const history: any = [];
const subscribers: any = [];

/**
 * Log a message
 * @param  {message [description]
 * @param  time     [description]
 * @return          [description]
 */
export const log = (message: string) => {
  history.push({ message, time: performance.now() });
  subscribers.map((listener: any) => listener(history));
};

/**
 * Get the history
 * @param  listener [description]
 * @return          [description]
 */
export const getHistory = () => history;

export const subscribe = (listener: any) => {
  subscribers.push(listener);
};

const start = (key: string) => {
  return true;
};

const stop = (key: string) => {
  return true;
};

/**
 * Output to console
 * @param  message Message
 * @return
 */
export const _console = (message: unknown) => {
  return console.log(message);
};

/**
 * Debug object
 */
export const debug = {
  _console,
  log
};

export default debug;

export const filterByMode = (mode: number) => {
  const state = store.getState();
  if (state.app.settings) return state.app.settings.mode >= mode;
  else return true;
};
