import { store } from "./Store";

const history: any = [];
const subscribers: any = [];

export const log = (message: string) => {
  subscribers.map((listener: any) => listener(message));
  history.push({ message, time: performance.now() });
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
