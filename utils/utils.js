exports.processResult = (result, interval) => {
  return result[interval].map((r) => {
    return { date: r[0], price: r[4] };
  });
};
