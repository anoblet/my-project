import { html } from '@polymer/lit-element';

export const TemplateMixin = function(superClass: any) {
  return class extends superClass {
    public template: Function;
    public templatePath: string;

    public importTemplate(template: string = '') {
      import(this.templatePath).then((module: any) => {
        this.template = module.default.bind(this);
      });
    }

    public render() {
      return html`
        <style>
          ${this.componentStyle}
        </style>
        ${
          !this.taskPending
            ? this.template(this.state)
            : html`
                <my-loader></my-loader>
              `
        }
      `;
    }
  };
};
