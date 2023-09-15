## Prerequisites

```
node --version
v18.9.0

npm --v
8.19.1
```

## Installation

```
npm install
```

## Run application

```
npm start
```

Go to http://127.0.0.1:3000/get-average to get average of all the random numbers stored in the memory

## Run tests

```
npm run test
```

### Notes

- console.error is used to log errors when api request fails or api doesn't return the values as expected, Pino could be used as more matured logger but kept console for simplicity
- When csrng api call issues max queries error, I am logging them so we can analyse how frequently we get this error and team can define what actions is needed if any
- No framework like Express.js is used to keep the code simple
