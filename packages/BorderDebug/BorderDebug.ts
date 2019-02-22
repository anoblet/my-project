export const BorderDebug = (superClass: any) => {
  return class extends superClass {
    public connectedCallback() {
      super.connectedCallback();
      this.style.padding = "var(--debug-padding)";
      this.style.border = "var(--debug-border)";
    }
  };
};
