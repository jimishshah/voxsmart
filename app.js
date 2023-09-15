const http = require("http");
const {
  getAverage,
  fetchRandomNumber,
  randomNumbersStore,
} = require("./helpers");

function startServer() {
  const hostname = "127.0.0.1";
  const port = 3000;

  const server = http.createServer(setRoutes);

  setInterval(fetchRandomNumber, 1000);

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  return server;
}

function setRoutes(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  switch (req.url) {
    case "/get-average":
      getAverageResponseRoute(res);
      break;
    default:
      res.end(
        JSON.stringify({
          status: "ok",
        })
      );
  }
}

function getAverageResponseRoute(res) {
  res.end(
    JSON.stringify({
      average: getAverage(randomNumbersStore),
    })
  );
}

module.exports = {
  startServer,
};
