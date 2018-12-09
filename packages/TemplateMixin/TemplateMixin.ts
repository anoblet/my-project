import { html } from '@polymer/lit-element';
const style = html``;

export const TemplateMixin = function (superClass: any) {
  return class extends superClass {
    template: Function;
    templatePath: string;

    importTemplate(template: string = '') {
      import(this.templatePath).then((module: any) => {
        this.template = module.default.bind(this);
      });
    }


    render() {
      console.log(import.meta);

      return html`
        <style>${style}</style>
        ${!this.taskPending ? this.template(this.state) : html`<my-loader></my-loader>`}
      `;
    }
  }
}
