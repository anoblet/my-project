export const BorderDebug = function (superClass: any) {
  return class extends superClass {
    connectedCallback() {
      super.connectedCallback();
      this.style.padding = 'var(--debug-padding)';
      this.style.border = 'var(--debug-border)';
    }
  }
}
