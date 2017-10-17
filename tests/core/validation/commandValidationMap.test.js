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
	canIncrementCounter: () => { return "incrementCounter" },
	canDecrementCounter: () => { return "decrementCounter" },
	canAddToCounter: number => { return `addCounter ${number}` },
	canSubtractFromCounter: number => { return `subtractCounter ${number}` }
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
		//Get the validation function
		const validationFunction = commandValidationMap[commandTypeNames.increment];

		//Call the validation function
		const result = validationFunction({});
		
		//Verify that we received the expected result based on our mock function
		expect(result).toBe("incrementCounter");
	});
	
	test('decrement command is mapped to the decrement counter validation', () => {
		//Get the validation function
		const validationFunction = commandValidationMap[commandTypeNames.decrement];

		//Call the validation function
		const result = validationFunction({});
		
		//Verify that we received the expected result based on our mock function
		expect(result).toBe("decrementCounter");
	});
	
	test('add command is mapped to the add to counter validation', () => {
		//Get the validation function
		const validationFunction = commandValidationMap[commandTypeNames.add];

		//Call the validation function
		const result = validationFunction({number: 3});
		
		//Verify that we received the expected result based on our mock function
		expect(result).toBe("addCounter 3");
	});

	test('subtract command is mapped to the subtract from counter validation', () => {
		//Get the validation function
		const validationFunction = commandValidationMap[commandTypeNames.subtract];

		//Call the validation function
		const result = validationFunction({number: 4});
		
		//Verify that we received the expected result based on our mock function
		expect(result).toBe("subtractCounter 4");
	});	
});
