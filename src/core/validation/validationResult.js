/**
 * Validation result functionality
 */

import R from 'ramda';
 
/**
 * Creates a base result object with properties common to all result objects
 *
 * @param {boolean} success - Whether the result is a successful result
 * @param {string} [message] - The message associated with the result
 */
const createBaseResultObject = (success, message) => ({ success, message });

/**
 * Creates a function that will add an error type to an object parameter if 
 * it is not null or undefined
 *
 * @param {string} errorType - The error type to be added to a result object
 * @return {Function} A function that receives an error object and returns an
 *	error object with the errorType added onto it if the errorType is not null
 * 	or undefined, otherwise returns the same object that was passed to it
 */
const createAddErrorType = errorType => R.ifElse(R.always(R.isNil(errorType)), R.identity, 
	R.merge({ errorType }));

/**
 * Creates a result object. If errorType is null or undefined, then it won't 
 * be included in the result object.
 *
 * @param {boolean} success - Whether the result is a successful result
 * @param {string} [errorType] - The type of error that the result represents
 * @param {string} [message] - The message associated with the result
 */
const createResult = R.curry((success, errorType, message) => {
	let result = createBaseResultObject(success, message);

	if(errorType) {
		result = R.merge({ errorType}, result);
	}
	
	return result;
});

/**
 * Creates a result object representing a success
 *
 * @param {string} [message] - The message associated with the result
 */
const createSuccessValidationResult = createResult(true, null);

/**
 * Creates a result object representing an error
 *
 * @param {string} [errorType] - The type of error that the result represents
 * @param {string} [message] - The message associated with the result
 */
const createErrorValidationResult = createResult(false);

const validationResult = {
	createSuccessValidationResult,
	createErrorValidationResult
};

export default validationResult;