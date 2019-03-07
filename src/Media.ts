let mediaSize: string;
const subscribers: any = [];

const observer = window.matchMedia("(max-width: 500px)");

const mediaChanged = (_media: any) => {
  mediaSize = _media.matches ? "mobile" : "desktop";
  subscribers.map((callback: any) => callback(mediaSize));
};

observer.addListener(mediaChanged);
mediaChanged(observer);

export const subscribe = (callback: any) => {
  subscribers.push(callback);
  mediaChanged(observer);
};

export const media = {
  subscribe
};
