import { fireToast } from "./components/ToastComponent/Toast";

// @todo Separate the helper from the ui
export const toast = (message: string) => fireToast(message);
