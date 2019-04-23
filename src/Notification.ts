export const requestPermission = async () => {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission !== "denied")
    await Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        return true;
      }
    });
};

export const notify = (message: string) => {
  return new Notification(message);
};
