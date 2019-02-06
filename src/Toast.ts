import { toast as importedToast } from "./components/ToastComponent/Toast";

// @todo Separate the helper from the ui
export const toast = (message: string) => importedToast(message);
