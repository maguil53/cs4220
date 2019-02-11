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
