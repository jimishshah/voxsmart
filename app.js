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

  return new Promise((resolve) => {
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
      resolve(server);
    });
  });
}

function setRoutes(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/json");
  switch (req.url) {
    case "/get-average":
      getAverageResponseRoute(res);
      break;
    default:
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          status: 404,
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
