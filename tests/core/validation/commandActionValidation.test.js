//Import the module that we are testing
import createCommandValidation from '../../../src/core/validation/commandActionValidation';

//Import the module's dependencies
import createCommandValidationMap from '../../../src/core/validation/commandValidationMap';
import createCounterValidation from '../../../src/core/validation/counterValidation';
import validationResult from '../../../src/core/validation/validationResult';
import errorTypes from '../../../src/core/validation/errorTypes';
import errorMessages from '../../../src/core/validation/errorMessages';

//Mock the module's dependencies
jest.mock('../../../src/core/validation/commandValidationMap');

//Testing the validateCommandPermitted() function
describe('testing whether a command is permitted', () => {
	test('can validate a valid command', () => {
		
	});
	
	test('can validate an invalid command', () => {
	});
});