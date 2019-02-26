const subscribers: any = [];

const observer = window.matchMedia("(max-width: 500px)");

const mediaChanged = (media: any) => {
  const mediaSize = media.matches ? "small" : "large";
  subscribers.map((callback: any) => callback(mediaSize));
};

observer.addListener(mediaChanged);
mediaChanged(observer);

export const subscribe = (callback: any) => {
  subscribers.push(callback);
  mediaChanged(observer);
};
