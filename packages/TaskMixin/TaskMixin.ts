export const TaskMixin = function (superClass: any) {
  return class extends superClass {
    startTask() {
      this.taskPending = true;
      this.requestUpdate();
    }
  
    stopTask() {
      this.taskPending = false;
      this.requestUpdate();
    }
  
    runTasks(tasks: any) {
      this.startTask();
      return new Promise((resolve, reject) => {
        return Promise.all(tasks).then((results: any) => {
          this.stopTask();
          return results;
        });
      });
    }
  
    taskChain(tasks: any) {
      this.startTask();
      return tasks.reduce((promiseChain: any, currentTask: any) => {
        return promiseChain.then((chainResults: any) =>
          currentTask.then((currentResult: any) =>
            [...chainResults, currentResult]
          )
        );
      }, Promise.resolve([])).then((arrayOfResults: any) => {
        this.stopTask();
      });
    }
  }
}
