export interface Cryptowat {
  result: ResultData;
  allowance: {
    cost: number;
    remaining: number;
    upgrade: string;
  };
}

export interface ResultData {
  [interval: string]: number[][];
}
