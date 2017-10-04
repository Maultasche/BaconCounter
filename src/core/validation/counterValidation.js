/**
 * Functions to perform counter value validation
 */

 import actions from '../counter/actions';
 
/**
* Retrieves functions that perform counter validation, detecting whether
* changing the counter value is allowed.
*
* @param {number} minValue - The minimum allowable counter value
* @param {number} maxValue - The maximum allowable counter value
* @returns {Object} - An object containing the validation functions
*/
function createCounterValidation(minValue, maxValue) {
	/**
	 * Verifies whether a value is within the allowed counter range
	 */
	const numberInCounterRange = R.both(R.gte(R.__, minValue), R.lte(R.__, maxValue));

	/**
	 * Verifies that a value is within the allowed counter range.
	 * 
	 * @param {number} value - The value to be compared against the allowed range
	 * @returns -1 if the value is below the range, 0 if the value is within
	 * the range, and 1 if the value is above the range
	 */ 
	const verifyCounterRange = R.cond([
		//If value is within the range, return 0
		[ numberInCounterRange, R.always(0)],
		//If value is below the range, return -1
		[ R.lt(R.__, minValue), R.always(-1)],
		//Otherwise, return 1
		[ R.T, R.always(1)]
	]);

	/**
	 * Indicates whether the counter value can be incremented
	 *
	 * @param {number} value - The value to be incremented
	 * @returns -1 if incrementing the value would cause it to be below the range, 
	 * 0 if incrementing the value leaves it within the range, and 1 if 
	 * incrementing the value would cause it to be above the range
	 */
	const canIncrementCounter = R.pipe(actions.incrementCounter, verifyCounterRange);

	/**
	 * Indicates whether the counter value can be decremented
	 *
	 * @param {number} value - The value to be incremented
	 * @returns -1 if decrementing the value would cause it to be below the range, 
	 * 0 if decrementing the value leaves it within the range, and 1 if 
	 * decrementing the value would cause it to be above the range
	 */
	const canDecrementCounter = R.pipe(actions.decrementCounter, verifyCounterRange);

	/**
	 * Indicates whether the counter value can be added to
	 *
	 * @param {number} value - The value to be added to
	 * @returns -1 if adding to the value would cause it to be below the range, 
	 * 0 if adding to the value leaves it within the range, and 1 if 
	 * adding to the value would cause it to be above the range
	 */
	const canAddToCounter = R.pipe(actions.addToCounter, verifyCounterRange);	

	/**
	 * Indicates whether the counter value can be subtracted from
	 *
	 * @param {number} value - The value to be subtracted from
	 * @returns -1 if subtracting from the value would cause it to be below the range, 
	 * 0 if subtracting from the value leaves it within the range, and 1 if 
	 * subtracting from the value would cause it to be above the range
	 */
	const canSubtractFromCounter = R.pipe(actions.subtractFromCounter, verifyCounterRange);	

	const counterValidation = {
		canIncrementCounter,
		canDecrementCounter,
		canAddToCounter,
		canSubtractFromCounter
	};
	
	return counterValidation;
}
	
export default createCounterValidation;