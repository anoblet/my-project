self.addEventListener("message", message => {
  const { data } = message;
  switch (data.action) {
    case "doubled":
      const number = data.payload;
      const doubled = data.payload * 2;
      self.postMessage({ command: "doubled", payload: doubled });
      break;
  }
});
