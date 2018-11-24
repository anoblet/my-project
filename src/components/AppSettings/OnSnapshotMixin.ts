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
      // const message = 'On snapshot callback'
      // console.log(message);
      // alert(message);
      const data = document.data();
      console.log(document.data());
      this.setState(document.data());

      if (document.metadata.hasPendingWrites !== 'local') this._updateStore(document.data());
    }
  }
}