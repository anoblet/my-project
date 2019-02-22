const { src, dest } = require("gulp");
const prompt = require("gulp-prompt");
function defaultTask(cb) {
  let answers = {};
  src("src/index.js").pipe(
    prompt.prompt(
      {
        message: "Component name",
        name: "name",
        type: "input"
      },
      function(res) {
        return true;
      }
    )
  );
  cb();
}

exports.default = defaultTask;
