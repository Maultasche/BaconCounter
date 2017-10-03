/**
 * Validation result functionality
 */

import R from 'rambda';
 
/**
 * Creates a result object
 *
 * @param {boolean} success - Whether the result is a successful result
 * @param {string} [errorType] - The type of error that the result represents
 * @param {string} [message] - The message associated with the result
 */
const createResult = R.curry((success, errorType, message) => {
	return { success, errorType, message };
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