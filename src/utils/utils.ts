import { ResultData } from "../types/api";
export const processResult = (result: ResultData, interval: number) => {
  return result[interval].map((r) => {
    return { date: r[0], price: r[4] };
  });
};
