/**
 * Validation result functionality
 */

//Creates a result
const createResult = (success, errorType, message) => {
	return { success, errorType, message };
};

//Creates a success validation result
const createSuccessValidationResult = _.curry(createResult)
	(true, null);

//Creates an error validation result
const createErrorValidationResult = _.curry(createResult)
	(false);

const validationResult = {
	createSuccessValidationResult,
	createErrorValidationResult
};

export default validationResult;