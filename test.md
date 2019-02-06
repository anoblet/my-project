## Theming in lit-element

## Theming in lit-element relies on custom properties in css:

Custom properties can be defined as follows:

```css
:host {
  --my-property: value
}
```

An example of this would be:

```css
:host {
  --background-color: #FFFFFF
}

Bear in mind, nothing has actually happened yet. We have declared a variable, but we have not used it. In order to use the custom property, we would need to do this:

```css
  .myChildElement {
    background: var(--background-color);
  }
```

We can also set a fallback value

```css
  .myChildElement {
    background: var(--background-color, "blue");
  }
```

To programtically update the value of a property we can use:
```
this.style.setProperty("--background-color", "red")
```

Custom properties permeate shadow boundaries, so no matter how many custom components you have, they will be able to reference this property.

Some es2015 stuff:

 JS:
Now for the fun stuff:

```
 themeProperties.map(theme => {
    this.style.setProperty(theme.property, theme.value);
});
```

TS:

```
 themeProperties.map(theme => {
    this.style.setProperty(theme.property, theme.value);
});
```

Let's say we want a dark theme toggle switch:

```js

class MyParent extends LitElement {
  static get styles() {
    return css`
      :host {
        background: var(--background-color);
        color: var(--text-color);
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("update-theme", e => {
      const themeProperties = e.detail;
      themeProperties.map(theme => {
        this.style.setProperty(theme.property, theme.value);
      });
    });
  }

  render() {
    return html`
      <my-child></my-child>
    `;
  }
}

class MyChild extends LitElement {
  theme = "light";

  render() {
    return html`
      <button
        @click="${() => {
        let theme;
        if (this.theme === "light") {
          theme = [
            { property: "--background-color", value: "black" },
            { property: "--text-color", value: "white" }
          ];
          this.theme = "dark";
        } else {
          theme = [
            { property: "--background-color", value: "white" },
            { property: "--text-color", value: "black" }
          ];
          this.theme = "light";
        }
        this.dispatchEvent(
          new CustomEvent("update-theme", {
            bubbles: true,
            composed: true,
            detail: theme
          })
        );
      }}"
      >
        Toggle
      </button>
      This is text in a child
    `;
  }
}
```
You can see it in action here: https://codesandbox.io/s/62j7nkzx03
