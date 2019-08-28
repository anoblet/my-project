export interface Poll {
  id: string;
  title: string;
  options: string[];
  result: {
    total: number;
  };
  votedIps: string[];
}

export class Option {
  public label: string = "";
  public value: number = 0;
}
