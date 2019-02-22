export const HelperMixin = (superClass: any) => {
  return class extends superClass {
    public _toggleAttribute(attribute: any, scope: any = this) {
      // this.getAttribute(attribute) == '' ? this.removeAttribute(attribute) : this.setAttribute(attribute, '');
      scope.getAttribute(attribute) === "" ? scope.removeAttribute(attribute) : scope.setAttribute(attribute, "");
    }
  };
};
