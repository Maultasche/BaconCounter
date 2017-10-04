/**
 * Command Validation Functions
 */

import R from 'ramda';
 
import createCommandValidationMap from './commandValidationMap';
import createCounterValidation from './counterValidation';
import validationResult from './validationResult';
import errorTypes from '../events/errorTypes';
import errorMessages from '../events/errorMessages';

const createErrorValidationResult = validationResult.createErrorValidationResult;
const createSuccessValidationResult = validationResult.createSuccessValidationResult;

/**
 * Creates a command validation object that enforces min and max values for the counter
 *
 * @param {number} minValue - The smallest allowed counter value
 * @param {number} maxValue - The largest allowed counter value
 * @returns {Object} An object containing the command validation functionality
 */
function createCommandValidation(minValue, maxValue) {
	//Create the counter validation logic
	const counterValidation = createCounterValidation(minValue, maxValue);

	//Create the command => validation function map
	const commandValidationMap = createCommandValidationMap(counterValidation);
	
	/**
	 * Retrieves the command validation function that corresponds to a command
	 *
	 * @param {Object} command - A command object
	 * @returns {Function} The command validation function or undefined of no validation
	 * 	function could be found
	 */
	const getCommandValidationFunction = R.pipe(R.prop("type"), R.prop(R.__, commandValidationMap));

	console.log(validationResult.createErrorValidationResult);
	/**
	 * Creates a command-not-recognized validation result
	 *
	 * @returns {Object} The validation result
	 */
	const createCommandNotRecognizedResult = R.partial(createErrorValidationResult, 
		[errorTypes.commandNotRecognized, errorMessages.getCommandNotRecognizedMessage() ]);

	/**
	 * Transforms the number that is returned from a counter validation function
	 * in a corresponding result object.
	 *
	 * @param {number} validationResult - The result number produced by the command 
	 * 	validation function. A -1 means that the command would cause the counter to
	 * 	go below the allowed range, a 0 means that the counter would be within the allowed
	 * 	range, and a 1 means that the command would cause the counter to go above the
	 * 	allowed range.
	 * @returns {Object} A result object that indicates if validation succeeded or failed,
	 *	and if there is a failure, what the problem is.
	 */ 
	const createValidationResult = R.cond([
		[ R.equals(-1), R.partial(createErrorValidationResult, [errorTypes.minValue, 
			errorMessages.getMinCounterValueMessage(minValue)]) ],
		[ R.equals(0), R.partial(createSuccessValidationResult, [ null ]) ],
		[ R.equals(1), R.partial(createErrorValidationResult, [errorTypes.maxValue, 
			errorMessages.getMaxCounterValueMessage(minValue)]) ]
	]);
			
	/**
	 * Determines if the input parameter is a function
	 *
	 * @param {} input - The item to be checked
	 * @returns true if the input parameter is a function, otherwise false
	 */
	const isFunction = R.pipe(R.type, R.equals("Function"));

	/**
	 * Takes a validation function as the input, and creates a validation result 
	 * function that accepts a command, validates the command, and creates the
	 * validation result object. Calling the resulting function is equivalent to calling
	 * createValidationResult(validationFunction(command)).
	 *
	 * If the validation function is not a function, then a command-not-recognized
	 * result is created.
	 *
	 * @param {Function} validationFunction - A command validation function
	 * @returns {Object} A validation result object
	 */
	const createValidationResultFunction =  
		R.ifElse(isFunction, 
			R.always(R.compose(createValidationResult)), 
			R.always(createCommandNotRecognizedResult));
		
	/**
	 * Validates whether a command can be permitted or not
	 *
	 * If a command validation function exists for the command, we call it
	 * and create a validation result. If not, we return a command-not-recognized
	 * validation result.
	 *
	 * @param {Object} command - The command to be validated 
	 * @returns {Object} A validation result indicating whether the command 
	 * 	is permitted, and if not, a code indicating why not
	 */
	const validateCommandPermitted = 
		R.converge(R.call, [ 
			R.pipe(getCommandValidationFunction, createResultFunction), 
			R.identity
		]);

		
	const commandValidation = {
		validateCommandPermitted
	};	
	
	return commandValidation;
}

export default createCommandValidation;
