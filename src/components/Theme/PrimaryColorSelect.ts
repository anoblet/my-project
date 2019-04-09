import { html } from "lit-element";
import { store } from "../../Store";
import { setState } from "../../State";
import { convert, setTheme } from "../../Theme";

const updateStore = (e: any) => {
  const primaryColor = e.target.options[e.target.selectedIndex].value;
  setTheme(convert({ primaryColor }), document.querySelector("app-component"));
  setState({
    type: "app",
    data: { settings: { theme: { primaryColor } } },
    store
  });
};

export const primaryColorSelect = html`
  <select @input=${updateStore}
    ><option value="white">White</option
    ><option value="red">Red</option></select
  >
`;
