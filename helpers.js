const randomNumbersStore = [];

function getAverage(randomNumbersStore) {
  const sumOfRandomNumbers = randomNumbersStore.reduce(
    (acc, curr) => acc + curr,
    0
  );
  return sumOfRandomNumbers / randomNumbersStore.length;
}

async function fetchRandomNumber() {
  try {
    const result = await fetch(
      "https://csrng.net/csrng/csrng.php?min=0&max=100"
    );
    const [value] = await result.json();
    if (value.random) randomNumbersStore.push(value.random);
    else
      console.error({
        message: "Random number not returned",
        value,
      });
  } catch (e) {
    console.error({
      message: "csrng api call failed",
      error: e,
    });
  }
}

module.exports = {
  getAverage,
  fetchRandomNumber,
  randomNumbersStore,
};
