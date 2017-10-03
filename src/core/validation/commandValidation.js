/**
 * Command Validation Functions
 */

import R from 'ramda';
 
import createCounterValidation from './counterValidation';
import validationResult from './validationResult';
import errorTypes from '../events/errorTypes';


/**
 * Retrieves the command validation function that corresponds to a command
 *
 * @param {Object} command - A command object
 * @returns {Function} The command validation function or undefined of no validation
 * 	function could be found
 */
const getCommandValidationFunction = R.pipe(R.prop("type"), R.prop(R.__, commandTypeMap));

/**
 * Creates a command-not-recognized validation result
 *
 * @returns {Object} The validation result
 */
const createCommandNotRecognizedResult = validationResult
	.createErrorValidationResult(errorTypes.commandNotRecognized);


	
const createValidationResult = () => { "Real Result" };

// /**
 // * Handles a validation function by calling it if it's a function, or
 // * generating a command-not-recognized validation function if it's 
 // * undefined
 // *
 // * @param {Function} function - A command validation function
 // * @returns {Object} A validation result
 // */
// const handleValidationFunction = (validationFunction, command) => R.ifElse(R.type("Function"), createValidationResult, createCommandNotRecognizedResult);

const mapValidationFunctionToResultFunction = R.ifElse(R.type("Function"), 
	R.always(createValidationResult), R.always(createCommandNotRecognizedResult));
	
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
	R.apply(mapValidationFunctionToResultFunction(R.apply(getCommandValidationFunction)));


// R.apply(R.pipe(R.apply(getCommandValidationFunction(), 
	// R.apply(getResultFunction));
	
// R.apply(R.apply(getResultFunction, R.apply(getCommandValidationFunction())))

// R.either(getCommandValidationFunction, createCommandNotRecognizedResult)


// validationFunction = getCommandValidationFunction() 

// resultFunction = validationFunction || createCommandNotRecognizedResult

// resultFunction(command)

 // R.ifElse(R.type("Function"), createValidationResult, createCommandNotRecognizedResult);



//R.pipe(getCommandValidationFunction, 
	//handleValidationFunction);

	
	
function validateCommandPermitted(command) {
	
	
	let validationResult;
	
	const validationFunction = commandTypeMap[command.type];
	
	if(validationFunction) {
		let result = validationFunction(counter, command.args);
		
		if(result === 0) {
			validationResult = createSuccessValidationResult();
		}
		else if(result === -1) {
			validationResult = createErrorValidationResult(
				errorTypes.minValue);
		}
		else {
			validationResult = createErrorValidationResult(
				errorTypes.maxValue);
		}
	}
	else {
		validationResult = createErrorValidationResult(
			errorTypes.commandNotRecognized); 
	}
	
	return validationResult;
}

const commandValidation = {
	validateCommandPermitted
};	

export default commandValidation;





// let commandTypeMap = {
	// ["add"]: (command) => 0,
	// ["subtract"]: (command) => 1
// };

// /**
 // * Retrieves the command validation function that corresponds to a command
 // *
 // * @param {Object} command - A command object
 // * @returns {Function} The command validation function or undefined of no validation
 // * 	function could be found
 // */
// const getCommandValidationFunction = R.pipe(R.prop("type"), R.prop(R.__, commandTypeMap));

// /**
 // * Creates a command-not-recognized validation result
 // *
 // * @returns {Object} The validation result
 // */
// const createCommandNotRecognizedResult = () => { result: "Not recognized result" };

	
// const createValidationResult = (result) => { result };

// // /**
 // // * Handles a validation function by calling it if it's a function, or
 // // * generating a command-not-recognized validation function if it's 
 // // * undefined
 // // *
 // // * @param {Function} function - A command validation function
 // // * @returns {Object} A validation result
 // // */
// // const handleValidationFunction = (validationFunction, command) => R.ifElse(R.type("Function"), 
// //createValidationResult, createCommandNotRecognizedResult);

// const mapValidationFunctionToResultFunction = R.ifElse(R.type("Function"), 
	// R.always(createValidationResult), R.always(createCommandNotRecognizedResult));
	
// /**
 // * Validates whether a command can be permitted or not
 // *
 // * If a command validation function exists for the command, we call it
 // * and create a validation result. If not, we return a command-not-recognized
 // * validation result.
 // *
 // * @param {Object} command - The command to be validated 
 // * @returns {Object} A validation result indicating whether the command 
 // * 	is permitted, and if not, a code indicating why not
 // */
// //const validateCommandPermitted = 
// //	R.apply(mapValidationFunctionToResultFunction(R.apply(getCommandValidationFunction)));
// //R.apply(mapValidationFunctionToResultFunction(R.apply(getCommandValidationFunction)));
// //R.apply(getCommandValidationFunction);

// //getCommandValidationFunction({ type: "add" });
// R.apply(getCommandValidationFunction, { type: "add" });
// //validateCommandPermitted({ type: "add" });
// //validateCommandPermitted({ type: "bob" });