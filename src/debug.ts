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

export const filterByMode = (mode: number) => {
  const state = store.getState();
  if (state.app.settings) return state.app.settings.mode >= mode;
  else return true;
};

const start = (key: string) => {
  return true;
};

const debugObject = {
  // history: [],
  pointer: "/",
  start
};
