export const isTrue = (expression: any, callback: any) => {
  return expression ? callback : "";
};

export const find = (path: string, object: any) => {
  const parts = path.split("/");
  let value = object;
  try {
    parts.map((part: string) => {
      if (!value[part]) throw false;
      value = value[part];
    });
  } catch (error) {
    value = error;
  }
  return value;
};

export const isEmpty = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const printContent = div => {
  console.log(div);
  const html =
    "<html><head>" +
    "" +
    '</head><body style="background:#ffffff;">' +
    div.innerHTML +
    "</body></html>";

  const WindowObject = window.open(
    "",
    "PrintWindow",
    "width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes"
  );
  WindowObject.document.writeln(html);
  WindowObject.document.close();
  WindowObject.focus();
  WindowObject.print();
  WindowObject.close();
};

export const detectClickOutside = (target, callback) =>
  document.addEventListener("click", evt => {
    let targetElement: any = evt.target; // clicked element
    do {
      if (targetElement == target) return;
      targetElement = targetElement.parentNode;
    } while (targetElement);
    callback();
  });

export const applyStyle = (node, style) => {
  node.shadowRoot.adoptedStyleSheets = [style._styleSheet];
};
