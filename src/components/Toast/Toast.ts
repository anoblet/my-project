import "./ToastComponent";
/**
 * Fire a toast
 * @param  message [description]
 * @return         [description]
 *
 * @todo Separate the helper from the ui
 */
export const toast = (message: string, config: { timeout: 2500 }) => {
  const element: any = document.createElement("toast-component");
  element.content = message;
  const container = document
    .querySelector("app-component")
    .shadowRoot.querySelector("#content");
  container.appendChild(element);
  setTimeout(() => element.parentNode.removeChild(element), config.timeout);
};
