import commandTypeNames from './commandTypeNames';

const commandTypes = [
  {
    name: commandTypeNames.increment,
    token: "i",
    args: []
  },
  {
    name: commandTypeNames.decrement,
    token: "d",
    args: []
  },
  {
    name: commandTypeNames.add,
    token: "a",
    args: [ "number" ]
  },
  {
    name: commandTypeNames.subtract,
    token: "s",
    args: [ "number" ]
  }
];

export default commandTypes;