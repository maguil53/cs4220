// First homework for Week 2

// #1
function replaceLetters(word, letters) {
  let targetDict = new Map();
  let newWord = "";

  // Each letter in "letters" will be a key for your map.
  for (let i = 0; i < letters.length; i++) {
    targetDict.set(letters[i], "-");
  }

  // Constructs newWord 1 character at a time. If the char is a key
  // in your map, append "-" instead of the actual character.
  for (let i = 0; i < word.length; i++) {
    if (targetDict.has(word[i])) {
      newWord += "-";
    } else {
      newWord += word[i];
    }
  }

  return newWord;
}

const arr = ["a", "e", "i", "o", "u"];
console.log(replaceLetters("node.js", arr)); // n-d-.js

// #2
function sumArray(mixedArray) {
  let result = 0;

  // For each element in our array, if the currentElement is a Number
  // then we simply add it to our result. Else if the currentElement
  // is a String AND that string can be converted into a Number (meaning
  // it won't produce NaN), then we also add that currentElement to our result.
  for (let i = 0; i < mixedArray.length; i++) {
    let currentElement = mixedArray[i];

    let isNumber = typeof currentElement == "number";
    let isString = typeof currentElement == "string";

    if (isNumber) {
      result += currentElement;
    } else if (isString && !isNaN(Number(currentElement))) {
      result += Number(currentElement);
    }
  }

  return result;
}

const myArray = [5, 2, "a", 4, "7", true, "b", "c", 7, "8", false];
console.log(sumArray(myArray)); // 33

// #3
// Use bracket notation in order to set the attribute name for our object dynamically.
// (since we shouldn't hardcode 'hi' in {'hi' : 1})
function countingWords(arr) {
  let result = {};

  // If map has key, add 1 to it's value
  // else, create key and set value to 1
  for (let i = 0; i < arr.length; i++) {
    let currentKey = arr[i];
    if (result.hasOwnProperty(currentKey)) {
      result[currentKey] += 1;
    } else {
      // Create property and set to 1
      result[currentKey] = 1;
    }
  }

  return result;
}

const testArray3 = [
  "hi",
  "hi",
  "hello",
  "world",
  "hello",
  "bonjour",
  "hi",
  "greetings",
  "bonjour"
];
console.log(countingWords(testArray3)); // { hi: 3, hello: 2, world: 1, greetings: 1 }

// #4
function createAnimals(animalData) {
  let animalFactory = {};

  for (let i = 0; i < animalData.length; i++) {
    // Create an empty object for key: i + 1
    animalFactory[i + 1] = {};
    for (let j = 0; j < animalData[i].length; j++) {
      const { property, assign } = testArray4[i][j]; // Destructuring

      // 1st bracket gets object for key: i+1
      // 2nd bracket lets you create attribute name and set a value to it
      animalFactory[i + 1][property] = assign;
    }
  }

  return animalFactory;
}

const testArray4 = [
  [
    { property: "name", assign: "Garfield" },
    { property: "owner", assign: "Jon Arbuckle" },
    { property: "color", assign: "yellow" },
    { property: "type", assign: "cat" }
  ],
  [
    { property: "name", assign: "Snoopy" },
    { property: "owner", assign: "Charlie Brown" },
    { property: "bestfriend", assign: "Woodstock" },
    { property: "type", assign: "dog" }
  ]
];

console.log(createAnimals(testArray4));
