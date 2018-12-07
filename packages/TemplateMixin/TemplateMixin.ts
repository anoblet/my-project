export const TemplateMixin = function (superClass: any) {
  return class extends superClass {
    template: Function;
    templatePath: string;

    importTemplate(template: string = '') {
      import(`${this.templatePath}`).then((module: any) => {
        this.template = module.default.bind(this);
      });
  }
}
