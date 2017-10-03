import R from 'ramda';

//Action functions

//Increments the counter
const incrementCounter = R.inc;

//Decrements the counter
const decrementCounter = R.dec;

//Adds a number to the counter
const addToCounter = R.add;
	
//Substracts a number from the counter
const subtractFromCounter = R.subtract;

const actions = {
	incrementCounter,
	decrementCounter,
	addToCounter,
	subtractFromCounter
};

export default actions;