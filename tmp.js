```document.onSnapshot((doc: any) => {
          const source = doc.metadata.hasPendingWrites ? "local" : "remote";
          callback(doc.data());
        })```;
