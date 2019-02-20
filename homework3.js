// #1
async function iterateNumbers(numbers) {
  try {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
      // Await for Promise to be resolved before storing new value inside total.
      total = await adder(total, numbers[i]); // Overwrite total with every iteration.
    }
    console.log("Total: " + total);
  } catch (err) {
    console.log(err);
  }
}

const adder = (previous, next) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isNaN(previous) || isNaN(next)) {
        reject("One of your values was not a number.");
      }
      resolve(previous + next);
    }, 10); // 10ms
  });
};

iterateNumbers([1, 2, 3, 5, 8, 13, 21]); // Total: 53
