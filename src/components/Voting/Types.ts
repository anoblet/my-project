export interface Poll {
  title: string,
  options: string[],
  result: {
    total: number;
  },
  votedIps: string[]
}

export interface Option {
  label: string,
  value: number
}
