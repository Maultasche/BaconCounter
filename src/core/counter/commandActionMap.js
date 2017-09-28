import actions from 'actions';

//Maps command types to their corresponding action functions
const commandActionMap = {
	[commandTypeNames.increment]: incrementCounter,
	[commandTypeNames.decrement]: decrementCounter,
	[commandTypeNames.add]: addToCounter,
	[commandTypeNames.subtract]: subtractFromCounter
};

export default commandActionMap;