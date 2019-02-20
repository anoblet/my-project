import { toast as importedToast } from "./components/ToastComponent/Toast";

/**
 * Fire a toast
 * @param  message [description]
 * @return         [description]
 *
 * @todo Separate the helper from the ui
 */
export const toast = (message: string) => importedToast(message);
