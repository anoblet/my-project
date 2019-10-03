import { getDocument } from "./Firebase";
import { config } from "../etc/config";

export const setTheme = (_theme: any, element: any) => {
  _theme.map((propertyMap: any) => {
    element.style.setProperty(propertyMap.property, propertyMap.value);
  });
};

export const set = setTheme;

export const convert = (document: any) => {
  const styles: any = [];
  Object.keys(document).map((style: any) => {
    const parts = style.split(/(?=[A-Z])/);
    const lowerParts: any = [];
    parts.map((part: any) => {
      lowerParts.push(part.toLowerCase());
    });
    const property = lowerParts.join("-");
    const result = `--${property}`;
    styles.push({ property: result, value: document[style] });
  });
  return styles;
};

// export const documentToTheme = convert;

export const setDefaultTheme = async () => {
  if (config.staticTheme) {
    const _theme = convert(config.theme);
    setTheme(_theme, document.querySelector("app-component"));
  } else {
    const settings = await getDocument({
      path: `app/settings`
    });
    const _theme = convert(settings.defaultTheme);
    setTheme(_theme, document.querySelector("app-component"));
  }
};

export const theme = {
  convert,
  set
};

export default theme;
