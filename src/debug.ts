import { store } from "./store";

// Singleton instance (?)
const history: any = [];

export const log = (message: string) =>
  history.push({ message, time: performance.now() });
export const getLog = () => history;
export const filterByMode = (mode: number) => {
  const state = store.getState();
  if (state.app.settings) return state.app.settings.mode >= mode;
};
