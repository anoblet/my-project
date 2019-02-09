export const setTheme = (theme: any, element: any) => {
  theme.map((propertyMap: any) => {
    element.style.setProperty(propertyMap.property, propertyMap.value);
  });
};

export const documentToStyle = (document: any) => {
  const styles: any = [];
  Object.keys(document).map(style => {
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
