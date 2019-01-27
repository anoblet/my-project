export const fireToast = (message: string) =>
  document.dispatchEvent(
    new CustomEvent("toast-fire", {
      bubbles: true,
      composed: true,
      detail: message
    })
  );

export const toast = (message: string) => fireToast(message);
