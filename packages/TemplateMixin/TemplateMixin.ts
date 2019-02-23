import { html } from "lit-element";

export const TemplateMixin = (superClass: any) => {
  return class extends superClass {
    public template: any;
    public templatePath: string;

    public importTemplate(template: string = "") {
      // import(this.templatePath).then((module: any) => {
      //   this.template = module.default.bind(this);
      // });
    }

    public render() {
      return this.template.bind(this)();
    }

    // public render() {
    //   return html`
    //     <style>
    //       ${this.componentStyle}
    //     </style>
    //     ${
    //       !this.taskPending
    //         ? this.template(this.state)
    //         : html`
    //             <my-loader></my-loader>
    //           `
    //     }
    //   `;
    // }
  };
};
