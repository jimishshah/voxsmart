const {
  getAverage,
  fetchRandomNumber,
  randomNumbersStore,
} = require("./helpers");

test("getAverage should give average of numbers in the array", () => {
  const result = getAverage([10, 10, 10]);

  expect(result).toEqual(10);
});

test("fetchRandomNumber should fetch random number from csnrg api and store it to randomNumbersStore if api returns value successfully", async () => {
  const initialRandomNumbersStore = [...randomNumbersStore];
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: () =>
      Promise.resolve([
        {
          status: "success",
          min: 0,
          max: 100,
          random: 83,
        },
      ]),
  });

  await fetchRandomNumber();

  expect(randomNumbersStore).toEqual([...initialRandomNumbersStore, 83]);
});

test("fetchRandomNumber should log the error if api call to csnrg fails", async () => {
  jest.spyOn(global, "fetch").mockRejectedValue("api failed");
  jest.spyOn(console, "error").mockImplementation(() => {});

  await fetchRandomNumber();

  expect(console.error).toHaveBeenCalledWith({
    error: "api failed",
    message: "csrng api call failed",
  });
});

test("fetchRandomNumber should log the error if api doesn't return expected random value and should not add anything to randomNumbersStore", async () => {
  const initialRandomNumbersStore = [...randomNumbersStore];
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: () =>
      Promise.resolve([
        {
          status: "error",
          code: "5",
          reason:
            "Reached maximum queries in the last second. To remove limitation, please get our PRO service at http://www.csrng.net",
        },
      ]),
  });
  jest.spyOn(console, "error").mockImplementation(() => {});

  await fetchRandomNumber();

  expect(console.error).toHaveBeenCalledWith({
    message: "Random number not returned",
    value: {
      code: "5",
      reason:
        "Reached maximum queries in the last second. To remove limitation, please get our PRO service at http://www.csrng.net",
      status: "error",
    },
  });
  expect(randomNumbersStore).toEqual(initialRandomNumbersStore);
});
