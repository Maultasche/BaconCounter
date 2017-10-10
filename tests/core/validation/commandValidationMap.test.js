/**
 * Command Validation Map Tests
 */

import createCommandValidationMap from '../../../src/core/validation/commandValidationMap';
import commandTypeNames from '../../../src/core/commands/commandTypeNames';

//Mock the command types used by the command validation map
//const mockCommandTypeNames = jest.mock('../../../src/core/commands/commandTypeNames');

//Create the mock counter validation functionality that will be used by the
//command validation map
const mockCounterValidation = {
	canIncrementCounter: () => {},
	canDecrementCounter: () => {},
	canAddToCounter: () => {},
	canSubtractFromCounter: () => {}
};

/**
 * Tests the command to action function validation mapping
 */
describe("verifying command to validation function mapping", () => {
	let commandValidationMap = null;
	
	//Create the command validation map before each test
	beforeEach(() => {
		commandValidationMap = createCommandValidationMap(mockCounterValidation);
	});
	
	test('increment command is mapped to the increment counter validation', () => {
		const validationFunction = commandValidationMap[commandTypeNames.increment];
		
		expect(validationFunction).toBe(mockCounterValidation.canIncrementCounter);
	});
	
	test('decrement command is mapped to the decrement counter validation', () => {
		const validationFunction = commandValidationMap[commandTypeNames.decrement];
		
		expect(validationFunction).toBe(mockCounterValidation.canDecrementCounter);
	});
	
	test('add command is mapped to the add to counter validation', () => {
		const validationFunction = commandValidationMap[commandTypeNames.add];
		
		expect(validationFunction).toBe(mockCounterValidation.canAddToCounter);
	});

	test('subtract command is mapped to the subtract from counter validation', () => {
		const validationFunction = commandValidationMap[commandTypeNames.subtract];
		
		expect(validationFunction).toBe(mockCounterValidation.canSubtractFromCounter);
	});	
});
