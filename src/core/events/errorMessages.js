/**
 * Enumerates the possible error messages. These error messages are intended to be readyState
 * by developers and not displayed in a UI
 */

import R from 'ramda';
 
const errorMessages = {
	//The message used when the counter would go under the minimum allowed value
	getMinCounterValueMessage: minValue => `The counter cannot be less than ${minValue}`,
	//The message used when the counter would go over the maximum allowed value
	getMaxCounterValueMessage: maxValue => `The counter cannot be more than ${maxValue}`,
	//The message used when the command was not recognized
	getCommandNotRecognizedMessage: R.always("The command was not recognized")
};

export default errorMessages;