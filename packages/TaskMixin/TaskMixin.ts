export const TaskMixin = function(superClass: any) {
  return class extends superClass {
    public taskPending = false;

    public startTask() {
      this.taskPending = true;
      this.requestUpdate();
    }

    public stopTask() {
      this.taskPending = false;
      this.requestUpdate();
    }

    public runTasks(tasks: any) {
      this.startTask();
      return new Promise((resolve, reject) => {
        return Promise.all(tasks).then((results: any) => {
          this.stopTask();
          resolve(results);
        });
      });
    }

    public taskChain(tasks: any) {
      this.startTask();
      return tasks
        .reduce((promiseChain: any, currentTask: any) => {
          return promiseChain.then((chainResults: any) =>
            currentTask.then((currentResult: any) => [
              ...chainResults,
              currentResult
            ])
          );
        }, Promise.resolve([]))
        .then((arrayOfResults: any) => {
          this.stopTask();
        });
    }
  };
};
