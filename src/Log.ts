const history: any = [];

export const log = (message: string) => history.push(message);
export const getLog = () => history;
