export interface ICryptoWatch {
  result: IResultData;
  allowance: {
    cost: number;
    remaining: number;
    upgrade: string;
  };
}

/**
 * example IResultData:
 *  {
 *    '3600': [
 *              [1, 2, 3],
 *              [4, 5, 6]
 *            ],
 *    '1800': [
 *              [1, 2, 3],
 *              [4, 5, 6]
 *            ]
 *  }
 */
export interface IResultData {
  [interval: string]: number[][];
}
