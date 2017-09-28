//Action functions

//Increments the counter
const incrementCounter = counterValue => counterValue + 1;

//Decrements the counter
const decrementCounter = counterValue => counterValue - 1;

//Adds a number to the counter
const addToCounter = (counterValue, number) => counterValue + number;
	
//Substracts a number from the counter
const subtractFromCounter = (counterValue, number) => counterValue - number;

const actions = {
	incrementCounter,
	decrementCounter,
	addToCounter,
	subtractFromCounter
};

export default actions;