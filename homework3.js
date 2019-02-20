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
  let timeInMilliSeconds = 0;
  const priorityList = [];
  const missingPriorities = [];

  for (let i = 0; i < todoList.length; i++) {
    const { name, priority } = todoList[i];
    hasPriority = priority == null ? false : true;

    if (hasPriority) {
      timeInMilliSeconds += 90;
      todoList[i].priority *= 10; // So priorities are displayed like the HW example
    }

    checkPriority(todoList[i], (error, result) => {
      if (hasPriority) {
        priorityList.push(result);
      } else {
        missingPriorities.push(result);
      }
    });
  }

  setTimeout(() => {
    priorityList.sort(function(a, b) {
      return b.priority - a.priority;
    });

    console.log("Priority:");
    console.log(priorityList);
    console.log("Missing Priority:");
    console.log(missingPriorities);
  }, timeInMilliSeconds + 1);
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
