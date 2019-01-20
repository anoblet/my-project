let history: any = [];

export const debug = (message: string) => history.push(message);
export const getLog = () => history;
