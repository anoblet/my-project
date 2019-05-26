export class Poll {
  id: string;
  title: string;
  options: string[];
  result: {
    total: number;
  };
  votedIps: string[]
}

export interface Option {
  label: string,
  value: number
}
