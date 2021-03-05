import { IResultData } from "../types/api";

export const processResult = (result: IResultData, interval: number) => {
  return result[interval].map((r) => {
    return { date: r[0], price: r[4] };
  });
};
