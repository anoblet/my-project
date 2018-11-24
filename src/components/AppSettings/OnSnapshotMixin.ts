export const OnSnapshotMixin = function (superClass: any) {
  return class extends superClass {
    async registerOnSnapshot(document: any) {
      return new Promise((resolve, reject) => {
        document.onSnapshot((doc: any) => {
          this.onSnapshotCallback(doc);
          resolve();
        });
      });
    }
    onSnapshotCallback(document: any) {
      // If request was not local, update state with the firebase document
      if (document.metadata.hasPendingWrites !== 'local') this.setState('settings', document.data());
    }
  }
}