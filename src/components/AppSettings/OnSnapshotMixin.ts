export const OnSnapshotMixin = function (superClass: any) {
  return class extends superClass {
    registerOnSnapshot(document: any) {
      document.onSnapshot((doc: any) => {
        this.onSnapshotCallback(doc);
      });
    }
    onSnapshotCallback(document: any) {
      const message = 'On snapshot callback'
      console.log(message);
      alert('On snapshot callback');

      if (document.metadata.hasPendingWrites !== 'local') this._updateStore(document.data());
      Promise.resolve();
    }
  }
}