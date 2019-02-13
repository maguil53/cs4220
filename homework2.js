// #1
const print = function({ name = "", leader = "", members = "" }) {
  let output = `Team: ${name}\nLeader: ${leader}\nMembers: `;

  if (members.length === 1) {
    output += `${members[0]}\n`;
  } else if (members.length > 1) {
    // Append all team members EXCEPT last
    for (let i = 0; i < members.length - 1; i++) {
      output += `${members[i]}, `;
    }

    output += `and ${members[members.length - 1]}\n`; // Append last team member
  } else {
    output += "\n"; // If no members were provided
  }
  console.log(output);
};

const group1 = {
  name: "Justice League",
  leader: "Wonder Woman",
  members: ["Batman", "Superman"]
};

const group2 = {
  name: "Avengers",
  members: ["Hulk", "Thor", "Captain America"]
};

print(group1);
print(group2);

// #2
class GroceryList {
  constructor(groceryObjects = []) {
    this.groceryObjects = groceryObjects;
    this.groceries = {};
    this.total = 0; // If total is 0, it means user has not called addTotal() yet.

    this.groceryObjects.forEach(item => this.addItem(item));
  }

  addItem(groceryObject) {
    const { item, quantity = 1, price = "n/a" } = groceryObject;

    if (this.groceries[item.toLowerCase()]) {
      // If item exists, add to the final quantity.

      this.groceries[item].finalQuantity += parseInt(quantity);
      if (price !== "n/a") {
        this.groceries[item].finalPrice = price; // Update price.
      }
    } else {
      this.groceries[item.toLowerCase()] = {
        finalQuantity: parseInt(quantity),
        finalPrice: price
      }; // Create item if it doesn't exist.
    }

    return this;
  }

  removeItem(item) {
    const product = item.toLowerCase(); // Handles cases like "pIZza"
    const quantity = this.groceries[product].finalQuantity;

    if (quantity < 2) {
      delete this.groceries[product];
    } else {
      this.groceries[product].finalQuantity -= 1;
    }

    return this;
  }

  addPrice(item, price) {
    if (this.groceries[item.toLowerCase()]) {
      this.groceries[item.toLowerCase()].finalPrice = price;
    } else {
      console.log("Sorry, that item doesn't exist. Please add the item first.");
    }

    return this;
  }

  addTotal() {
    for (let property in this.groceries) {
      let price = this.groceries[property].finalPrice;
      if (price == "n/a") {
        continue;
      }
      let quantity = parseInt(this.groceries[property].finalQuantity); // In case quantity was entered as a String
      this.total += price * quantity;
    }

    return this;
  }

  get print() {
    for (let property in this.groceries) {
      let quantity = this.groceries[property].finalQuantity;
      let price = this.groceries[property].finalPrice;
      console.log(
        `Item: ${property} | Quantity: ${quantity} | Price: ${price}`
      );
    }
    if (this.total <= 0) {
      console.log("Total: 0 (Please call addTotal() before printing receipt)");
    } else {
      console.log(`Total: ${this.total.toFixed(2)}`); // toFixed(2) rounds 19.0099999 to 19.01
    }
  }
}

let myGroceries = new GroceryList();

myGroceries
  .addItem({ item: "bread", quantity: "1" })
  .addItem({ item: "soup", quantity: "3" })
  .addItem({ item: "chips", quantity: "4" })
  .addItem({ item: "soda", quantity: "1" })
  .addPrice("chiPs", 5.99)
  .removeItem("Chips")
  .addPrice("soda", 1.04)
  .addTotal().print;
