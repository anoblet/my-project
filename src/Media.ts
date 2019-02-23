const subscribers: any = [];

const mediaChanged = (media: any) => {
  const mediaSize = media.matches ? "small" : "large";
  subscribers.map((callback: any) => callback(mediaSize));
};

const observer = window.matchMedia("(max-width: 500px)");

observer.addListener(mediaChanged);
mediaChanged(observer);

export const subscribe = (callback: any) => {
  subscribers.push(callback);
};
