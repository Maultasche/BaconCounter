/**
 * Functions for creating mock data
 */

import R from 'ramda';

/**
 * Mocks the action functions 
 *
 * @param {number} counterValue - The counter value the action functions 
 *	are to operate on
 * @returns {Object} The object containing the action functions
 */
function createMockActions(counterValue) {
	const actions = {
		incrementCounter: R.partial(R.inc, [counterValue]),
		decrementCounter: R.partial(R.dec, [counterValue]),
		addToCounter: R.partial(R.add, [counterValue]),
		subtractFromCounter: R.partial(R.subtract, [counterValue])
	};
	
	return actions;
}

const mockData = {
	createMockActions
};

export default mockData;