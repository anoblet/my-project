import { store } from "./Store";

const history: any = [];
const subscribers: any = [];

export const debug = (message: string) => {
  history.push({ message, time: performance.now() });
  subscribers.map((listener: any) => listener(history));
};

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

const debugObject = {
  pointer: "/",
  start,
  stop
};

export const filterByMode = (mode: number) => {
  const state = store.getState();
  if (state.app.settings) return state.app.settings.mode >= mode;
  else return true;
};

export const _console = message => {
  return console.log(message);
};

export const debug = {
  _console
};
