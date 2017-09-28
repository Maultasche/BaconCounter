//Counter Validation Functions

//Verifies that a value falls within the allowed counter range
//Returns -1 if the value is below the range, 0 if the value is within
//the range, and 1 if the value is above the range
const verifyCounterRange = _.curry(verifyWithinRange)(_, minCounterValue, maxCounterValue);

//Indicates whether the counter value can be incremented
//Returns -1 if incrementing the value would cause it to be below the range, 
//0 if incrementing the value leaves it within the range, and 1 if 
//incrementing the value would cause it to be above the range
const canIncrementCounter = (counterValue) => 
	verifyCounterRange(incrementCounter(counterValue));

//Indicates whether the counter value can be decremented
//Returns -1 if decrementing the value would cause it to be below the range, 
//0 if the decrementing the value leaves it within the range, and 1 if 
//decrementing the value would cause it to be above the range
const canDecrementCounter = (counterValue) => 
	verifyCounterRange(decrementCounter(counterValue));

//Indicates whether the counter value can be added to
//Returns -1 if adding to the value would cause it to be below the range, 
//0 if adding to the value leaves it within the range, and 1 if 
//adding to the value would cause it to be above the range
const canAddToCounter = 
	(counterValue, number) => verifyCounterRange(addToCounter(counterValue));

//Indicates whether the counter value can be subtracted from
//Returns -1 if subtracting from the value would cause it to be below the range, 
//0 if subtracting from the value leaves it within the range, and 1 if 
//subtracting from the value would cause it to be above the range
const canSubtractFromCounter = 
	(counterValue, number) => verifyCounterRange(subtractFromCounter(counterValue));

//Verifies that a value is within an inclusive number range.
//Returns -1 if the value is below the range, 0 if the value is within
//the range, and 1 if the value is above the range
function verifyWithinRange(value, minValue, maxValue) {
	return (value >= minValue) && (value <= maxValue) ? 0 :
		value < minValue ? -1 : 1;
}
	
const counterValidation = {
	canIncrementCounter,
	canDecrementCounter,
	canAddToCounter,
	canSubtractFromCounter
};

export default counterValidation;