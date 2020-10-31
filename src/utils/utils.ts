export const processResult = (
  result: { [x: string]: any[] },
  interval: number
) => {
  return result[interval].map((r) => {
    return { date: r[0], price: r[4] };
  });
};
