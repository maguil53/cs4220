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

// #2

const makePriorityList = todoList => {
  let hasPriority = false;
  const priorityList = [];
  const missingPriorities = [];

  for (let i = 0; i < todoList.length; i++) {
    checkPriority(todoList[i], (error, result) => {
      hasPriority = error ? false : true;

      if (hasPriority) {
        priorityList.push(result);
      } else {
        missingPriorities.push(result);
      }
    });
  }

  // These will be called right before your loop finishes (NOT WHAT WE WANT)
  // SO WE MIGHT HAVE TO HAVE A "console.log()" INSIDE A CALLBACK!

  // Should put this in a callback

  // ********************************************************************
  // Temporary Fix
  // The reason why you're printing EMPTY lists is because "console.log()" 's
  // are being executed before your loop is finished traversing through the list!
  setTimeout(() => {
    console.log("Priority:");
    console.log(priorityList);
    console.log("Missing Priority:");
    console.log(missingPriorities);
  }, 2000);
};

const checkPriority = (todo, callback) => {
  const { name, priority } = todo;

  if (priority) {
    setTimeout(() => {
      callback(null, todo);
    }, 90);
  } else {
    // No Priority
    callback("Todo object doesn't have priority", name);
  }
};

const todos = [
  {
    name: "get coffee",
    priority: 9
  },
  {
    name: "clean room",
    priority: null
  },
  {
    name: "go to CS4220",
    priority: 4
  },
  {
    name: "do homework before due date",
    priority: 8
  }
];

makePriorityList(todos);

// Priority
//   [ { name: 'get coffee', priority: 90 },
//   { name: 'do homework before due date', priority: 80 },
//   { name: 'go to CS4220', priority: 40 } ]
// Missing Priority [ 'clean room' ]

// References:
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
