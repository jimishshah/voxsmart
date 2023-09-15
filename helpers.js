const randomNumbersStore = [];

function getAverage(randomNumbersStore) {
  const sumOfRandomNumbers = randomNumbersStore.reduce(
    (acc, curr) => acc + curr,
    0
  );
  return sumOfRandomNumbers / randomNumbersStore.length;
}

async function fetchRandomNumber() {
  await fetch("https://csrng.net/csrng/csrng.php?min=0&max=100")
    .then((result) => result.json())
    .then(([value]) => {
      if (value.random) randomNumbersStore.push(value.random);
      else
        console.error({
          message: "Random number not returned",
          value,
        });
    })
    .catch((e) => {
      console.error({
        message: "csrng api call failed",
        error: e,
      });
    });
}

module.exports = {
  getAverage,
  fetchRandomNumber,
  randomNumbersStore,
};
