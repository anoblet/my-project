document.onkeyup = function(e) {
  // e = e || window.event;
  if (e.shiftKey && e.keyCode == 32) {
    console.log("Hi");
  }
};
