//Command Validation Functions

import counterValidation from './counterValidation';
import validationResult from './validationResult';
import errorTypes from '../events/errorTypes';

//Validates whether a command can be permitted or not. 
//Returns an object indicating whether the command is permitted,
//and if not, a code indicating why not
function validateCommandPermitted(command, errorTypes) {
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