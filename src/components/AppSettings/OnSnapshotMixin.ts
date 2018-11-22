export const OnSnapshotMixin = function (superClass: any) {
  return class extends superClass {
    registerOnSnapshot(document: any) {
      return new Promise((resolve, reject) => {
        document.onSnapshot((doc: any) => {
          this.onSnapshotCallback(doc);
          resolve();
        });
      });
    }
    onSnapshotCallback(document: any) {
      const message = 'On snapshot callback'
      console.log(message);
      // alert(message);

      if (document.metadata.hasPendingWrites !== 'local') this._updateStore(document.data());
      Promise.resolve();
    }
  }
}