const superagent = require("superagent"),
  inquirer = require("inquirer");

async function draw(shuffle = false, count = 1) {
  const base = "https://deckofcardsapi.com/api/deck";

  const deckResponse = await superagent.get(
    `${base}/${shuffle ? "new/shuffle" : "new"}`
  );
  const deckId = deckResponse.body.deck_id;

  const drawResponse = await superagent.get(
    `${base}/${deckId}/draw/?count=${count}`
  );
  const result = drawResponse.body;

  console.log("-- CARDS --");
  console.log(`YOU HAVE DRAWN ${result.cards.length} CARDS`);

  const drawAnother = await anotherCardPrompt();
  console.log(drawAnother);

  // Cards the player has so far
  let cardsToDisplay = result.cards;

  if (drawAnother.card) {
    // Draw again from the SAME deck. (Use deckId)
    superagent.get(`${base}/${deckId}/draw/?count=1`).then(response => {
      cardsToDisplay.push(response.body.cards[0]);
      print(cardsToDisplay);
      console.log(`\nREMAINING CARDS: ${response.body.remaining}`);
    });
  } else {
    print(cardsToDisplay);
    console.log(`\nREMAINING CARDS: ${result.remaining}`); // Use result from previous GET request
  }
}

function print(cards) {
  let sum = 0;
  cards.forEach(({ value, suit }) => {
    console.log(`${value} of ${suit}`);
    if (!isNaN(parseInt(value))) {
      sum += parseInt(value);
    } else if (value === "ACE") {
      sum += 11;
    } else {
      sum += 10;
    }
  });
  console.log(`\nTOTAL CARD VALUE: ${sum}`);
}

async function anotherCardPrompt() {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "card",
      message: "Would you like to draw another card?"
    }
  ]);
}

module.exports = { draw };
