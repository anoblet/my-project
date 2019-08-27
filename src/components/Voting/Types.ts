export class Poll {
  public id: string;
  public title: string = "";
  public options: string[] = [];
  public result: {
    total: number;
  };
  public votedIps: string[];
}

export class Option {
  public label: string = "";
  public value: number = 0;
}
