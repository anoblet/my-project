const { src, dest } = require("gulp");
const prompt = require("gulp-prompt");
function defaultTask(cb) {
  let answers = {};
  src("src/index.js").pipe(
    prompt.prompt(
      {
        type: "input",
        name: "name",
        message: "Component name"
      },
      function(res) {
        answers.task;
      }
    )
  );
  cb();
}

exports.default = defaultTask;
