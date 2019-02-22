export const OnSnapshotMixin = function(superClass: any) {
  return class extends superClass {
    public async registerOnSnapshot(document: any) {
      return new Promise((resolve, reject) => {
        document.onSnapshot((doc: any) => {
          this.onSnapshotCallback(doc);
          resolve();
        });
      });
    }
    public onSnapshotCallback(document: any) {
      // If request was not local, update state with the firebase document
      if (document.metadata.hasPendingWrites !== "local") this.setState(document.data(), "settings");
    }
  };
};
