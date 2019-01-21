const computeMaxGainForStockSeries = require("./max-stock-gain");

const serieses = [
  [9, 11, 8, 5, 7, 10],
  [9, 11, 8, 5, 2, 7, 13],
  [9, 11, 8, 5, 2, 13, 7],
  [15, 12, 11]
];

const maxGains = [
  5,
  11,
  11,
  -1
];

test("Basic functionality", () => {

  serieses.forEach((series, i) => {
    expect(computeMaxGainForStockSeries(series)).toEqual(maxGains[i]);
  });

});
