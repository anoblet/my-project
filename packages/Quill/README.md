Usage:

```
${
  this.editable
    ? html`
        <quill-component
          .value="${this.content}"
        ></quill-component>
      `
    : html`
        ${
          this.content
            ? html`
                <quill-display
                  .value="${this.content}"
                ></quill-display>
              `
            : ""
        }
      `
```
