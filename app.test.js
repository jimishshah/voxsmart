const { startServer } = require("./app");
const { fetchRandomNumber } = require("./helpers");

jest.mock("./helpers");

describe("server", () => {
  let server;
  beforeAll(() => {
    jest.useFakeTimers();
    fetchRandomNumber.mockImplementation(() => {});
    server = startServer();
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(() => resolve()));
  });

  it("should fetch random number api every minute", () => {
    expect(fetchRandomNumber).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(fetchRandomNumber).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(5000);
    expect(fetchRandomNumber).toHaveBeenCalledTimes(6);
  });

  it("/get-request should be valid url", async () => {
    const response = await fetch("http://127.0.0.1:3000/get-average");
    expect(response.status).toEqual(200);
  });
});
